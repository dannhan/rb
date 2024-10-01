import { customAlphabet } from "nanoid";

export function nanoid(chars = 20) {
  return customAlphabet(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    chars,
  )();
}
