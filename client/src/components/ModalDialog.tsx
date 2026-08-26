import { useEffect, useRef, type ReactNode } from "react";

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

/**
 * offsetParent 로 가시성을 보지 않는다. position: fixed 요소에서는 항상 null 이고,
 * 레이아웃이 없는 환경(jsdom)에서는 모든 항목이 걸러져 순환 자체가 사라진다.
 * 모달 안에 그려진 컨트롤은 기본적으로 도달 대상이므로, 스스로 감춰진 것만 뺀다.
 */
function focusableItems(root: HTMLElement) {
  return Array.from(
    root.querySelectorAll<HTMLElement>(focusableSelector)
  ).filter(element => {
    if (element.closest("[hidden]")) return false;
    const style = getComputedStyle(element);
    return style.display !== "none" && style.visibility !== "hidden";
  });
}

/**
 * 다섯 개 화면이 같은 모달 구조를 각자 반복하고 있었고, 어느 것도 포커스를
 * 옮기지 않아 키보드·스크린 리더 사용자는 모달이 열린 뒤에도 뒤쪽 페이지를
 * 계속 탐색하게 됐다. 여는 순간 안으로 포커스를 넣고, Tab 을 안에 가두고,
 * 닫을 때 열었던 곳으로 되돌린다.
 *
 * Escape 는 Home 의 전역 핸들러가 이미 처리하므로 여기서 다시 잡지 않는다.
 */
export function ModalDialog({
  className,
  labelledBy,
  onClose,
  children,
}: {
  /** section 에 붙일 클래스. 기존 스타일을 그대로 쓰기 위해 호출부가 정한다. */
  className: string;
  labelledBy: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const opener = document.activeElement as HTMLElement | null;
    const [first] = focusableItems(dialog);
    (first ?? dialog).focus();

    const trapTab = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const items = focusableItems(dialog);
      if (items.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }
      const edge = event.shiftKey ? items[0] : items[items.length - 1];
      if (
        document.activeElement !== edge &&
        dialog.contains(document.activeElement)
      )
        return;
      event.preventDefault();
      (event.shiftKey ? items[items.length - 1] : items[0]).focus();
    };

    document.addEventListener("keydown", trapTab, true);
    return () => {
      document.removeEventListener("keydown", trapTab, true);
      if (opener && document.contains(opener)) opener.focus();
    };
  }, []);

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        ref={dialogRef}
        className={className}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        onMouseDown={event => event.stopPropagation()}
      >
        {children}
      </section>
    </div>
  );
}
