import { describe, expect, test } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react-native";
import App from "../src/app/index";

const MSG_EMPTY = "Both players must choose an option.";

// ทำตามขั้นตอนใน Test case: เริ่มเกม -> P1 เลือก -> P2 เลือก -> กดปุ่มแสดงผล
async function play(p1?: string, p2?: string) {
  await render(<App />); // 1. เริ่มเกม
  if (p1) await fireEvent.press(screen.getByTestId(`p1-${p1}`)); // 2. P1 เลือก
  if (p2) await fireEvent.press(screen.getByTestId(`p2-${p2}`)); // 3. P2 เลือก
  await fireEvent.press(screen.getByTestId("btn-submit")); // 4. กดปุ่มแสดงผล
}

const winnerText = () => screen.getByTestId("text-winner").props.children;

// ชื่อที่ใช้ใน testID -> ค่าที่แสดงบนหน้าจอ
const label: Record<string, string> = {
  rock: "Rock",
  paper: "Paper",
  scissors: "Scissors",
};

describe("Test case ที่เขียนไว้", () => {
  test("Test case P1 Win: Scissors vs Paper", async () => {
    await play("scissors", "paper");
    expect(screen.getByText('P1 "Scissors"')).toBeTruthy(); // 5. ขึ้นตามที่เลือก
    expect(screen.getByText('P2 "Paper"')).toBeTruthy();
    expect(winnerText()).toBe("P1 ชนะ"); // 6. ขึ้น P1 ชนะ
  });

  test("Test case P2 Win: Rock vs Paper", async () => {
    await play("rock", "paper");
    expect(screen.getByText('P1 "Rock"')).toBeTruthy();
    expect(screen.getByText('P2 "Paper"')).toBeTruthy();
    expect(winnerText()).toBe("P2 ชนะ"); // ต้องเป็น P2 ชนะ (ใน test case เดิมพิมพ์ P1 ผิด)
  });

  test("Test case เสมอ: Paper vs Paper", async () => {
    await play("paper", "paper");
    expect(screen.getByText('P1 "Paper"')).toBeTruthy();
    expect(screen.getByText('P2 "Paper"')).toBeTruthy();
    expect(winnerText()).toBe("เสมอ"); // 6. ขึ้นเสมอ
  });
});

describe("เลือกครบทั้งสองฝั่ง (ครบ 9 รูปแบบ)", () => {
  test.each([
    ["rock", "rock", "เสมอ"],
    ["rock", "paper", "P2 ชนะ"],
    ["rock", "scissors", "P1 ชนะ"],
    ["paper", "rock", "P1 ชนะ"],
    ["paper", "paper", "เสมอ"],
    ["paper", "scissors", "P2 ชนะ"],
    ["scissors", "rock", "P2 ชนะ"],
    ["scissors", "paper", "P1 ชนะ"],
    ["scissors", "scissors", "เสมอ"],
  ])("%s vs %s = %s", async (p1, p2, expected) => {
    await play(p1, p2);
    expect(screen.getByText(`P1 "${label[p1]}"`)).toBeTruthy();
    expect(screen.getByText(`P2 "${label[p2]}"`)).toBeTruthy();
    expect(winnerText()).toBe(expected);
  });
});

describe("ว่างเปล่า / เลือกไม่ครบ", () => {
  test("ไม่เลือกทั้งคู่ แล้วกดแสดงผล", async () => {
    await play();
    expect(winnerText()).toBe(MSG_EMPTY);
    expect(screen.getByText('P1 ""')).toBeTruthy();
    expect(screen.getByText('P2 ""')).toBeTruthy();
  });

  test("P1 เลือก (Rock) แต่ P2 ว่าง", async () => {
    await play("rock", undefined);
    expect(winnerText()).toBe(MSG_EMPTY);
    expect(screen.getByText('P1 "Rock"')).toBeTruthy();
    expect(screen.getByText('P2 ""')).toBeTruthy();
  });

  test("P2 เลือก (Paper) แต่ P1 ว่าง", async () => {
    await play(undefined, "paper");
    expect(winnerText()).toBe(MSG_EMPTY);
    expect(screen.getByText('P1 ""')).toBeTruthy();
    expect(screen.getByText('P2 "Paper"')).toBeTruthy();
  });
});

describe("พฤติกรรมอื่นของปุ่ม", () => {
  test("ก่อนกดแสดงผล ยังไม่มีผลแพ้ชนะ", async () => {
    await render(<App />);
    await fireEvent.press(screen.getByTestId("p1-rock"));
    await fireEvent.press(screen.getByTestId("p2-paper"));
    expect(winnerText()).toBe(""); // ยังไม่กด btn-submit
    expect(screen.getByText('P1 ""')).toBeTruthy(); // ยังไม่โชว์ที่เลือก
  });

  test("เปลี่ยนใจเลือกใหม่ก่อนกดแสดงผล ใช้ค่าล่าสุด", async () => {
    await render(<App />);
    await fireEvent.press(screen.getByTestId("p1-rock"));
    await fireEvent.press(screen.getByTestId("p1-scissors")); // เปลี่ยนเป็น Scissors
    await fireEvent.press(screen.getByTestId("p2-paper"));
    await fireEvent.press(screen.getByTestId("btn-submit"));
    expect(screen.getByText('P1 "Scissors"')).toBeTruthy();
    expect(winnerText()).toBe("P1 ชนะ");
  });

  test("เล่นซ้ำรอบที่สองได้ ผลเปลี่ยนตามที่เลือกใหม่", async () => {
    await render(<App />);
    await fireEvent.press(screen.getByTestId("p1-rock"));
    await fireEvent.press(screen.getByTestId("p2-scissors"));
    await fireEvent.press(screen.getByTestId("btn-submit"));
    expect(winnerText()).toBe("P1 ชนะ");

    await fireEvent.press(screen.getByTestId("p2-paper")); // เปลี่ยน P2 เป็น Paper
    await fireEvent.press(screen.getByTestId("btn-submit"));
    expect(winnerText()).toBe("P2 ชนะ");
  });
});
