// @vitest-environment jsdom
import { createElement, useState } from "react";
import * as ReactRuntime from "react";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { ModalDialog } from "./ModalDialog";

Object.assign(globalThis, { React: ReactRuntime });

function Harness() {
  const [open, setOpen] = useState(false);
  return createElement(
    "div",
    null,
    createElement(
      "button",
      { type: "button", onClick: () => setOpen(true) },
      "열기"
    ),
    open
      ? createElement(
          ModalDialog,
          {
            className: "log-modal",
            labelledBy: "harness-title",
            onClose: () => setOpen(false),
          },
          createElement("h2", { id: "harness-title" }, "제목"),
          createElement("button", { type: "button" }, "첫 번째"),
          createElement("button", { type: "button" }, "마지막")
        )
      : null
  );
}

describe("ModalDialog", () => {
  afterEach(() => cleanup());

  it("moves focus into the dialog when it opens", () => {
    render(createElement(Harness));
    fireEvent.click(screen.getByRole("button", { name: "열기" }));
    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "첫 번째" })
    );
  });

  it("names the dialog with the heading it points at", () => {
    render(createElement(Harness));
    fireEvent.click(screen.getByRole("button", { name: "열기" }));
    const dialog = screen.getByRole("dialog");
    expect(dialog.getAttribute("aria-modal")).toBe("true");
    expect(dialog.getAttribute("aria-labelledby")).toBe("harness-title");
  });

  it("wraps Tab from the last control back to the first", () => {
    render(createElement(Harness));
    fireEvent.click(screen.getByRole("button", { name: "열기" }));
    const last = screen.getByRole("button", { name: "마지막" });
    last.focus();
    fireEvent.keyDown(last, { key: "Tab" });
    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "첫 번째" })
    );
  });

  it("wraps Shift+Tab from the first control back to the last", () => {
    render(createElement(Harness));
    fireEvent.click(screen.getByRole("button", { name: "열기" }));
    const first = screen.getByRole("button", { name: "첫 번째" });
    first.focus();
    fireEvent.keyDown(first, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "마지막" })
    );
  });

  it("returns focus to whatever opened it", () => {
    render(createElement(Harness));
    const opener = screen.getByRole("button", { name: "열기" });
    opener.focus();
    fireEvent.click(opener);
    expect(document.activeElement).not.toBe(opener);
    fireEvent.mouseDown(document.querySelector(".modal-backdrop")!);
    expect(document.activeElement).toBe(opener);
  });
});
