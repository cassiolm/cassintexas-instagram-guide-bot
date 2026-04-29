import { BRAND_NAME, GUIDE_URL } from "./config.js";

export function normalizeText(value = "") {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

export function buildGuideMessage(username) {
  const greeting = username ? `Fala, @${username}!` : "Fala!";

  return [
    greeting,
    "",
    "Aqui está o guia gratuito que prometi 🇺🇸",
    "",
    "Ele vai te ajudar a começar a planejar uma vida no Texas com mais clareza e menos improviso:",
    "",
    GUIDE_URL,
    "",
    "Depois me responde uma coisa: você ainda está só pesquisando ou já está planejando sair do Brasil?",
    "",
    `— ${BRAND_NAME}`
  ].join("\\n");
}
