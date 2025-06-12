const promptBox = document.getElementById("promptBox");
const promptText = document.getElementById("promptText");
const generateButton = document.getElementById("generateButton");
const copyButton = document.getElementById("copyButton");
const historyList = document.getElementById("historyList");
const flameLogo = document.getElementById("flameLogo");
const historyTitle = document.getElementById("historyTitle");
const orderText = document.getElementById("orderText");
const langToggle = document.querySelector(".lang-toggle");

const translations = {
  en: {
    generate: "GENERATE HELLPROMPT",
    loading: "SUMMONING...",
    loadingPrompts: "LOADING PROMPTS...",
    placeholder: 'Click "Generate" to create a hellish prompt...',
    copy: "Copy",
    copied: "Copied!",
    historyTitle: "PREVIOUS SUMMONINGS",
    order: "order all hellprompts via +905539837625",
  },
  tr: {
    generate: "CEHENNEM KOMUTU ÜRET",
    loading: "ÇAĞRILIYOR...",
    loadingPrompts: "İPUÇLARI YÜKLENİYOR...",
    placeholder: 'Şeytani bir komut oluşturmak için "Üret"e tıklayın...',
    copy: "Kopyala",
    copied: "Kopyalandı!",
    historyTitle: "ÖNCEKİ ÇAĞRILMALAR",
    order: "tüm hellpromptları +905539837625 üzerinden sipariş edin",
  },
};

let currentLang = localStorage.getItem("lang") || "en";

function applyTranslations(lang) {
  const t = translations[lang];
  document.documentElement.lang = lang;
  generateText.textContent = t.generate;
  loadingText.textContent = t.loading;
  loadingPromptsText.textContent = t.loadingPrompts;
  promptText.textContent = t.placeholder;
  copyButton.textContent = t.copy;
  historyTitle.textContent = t.historyTitle;
  orderText.textContent = t.order;
}

function loadPrompts(lang) {
  return fetch(`hellPrompts.${lang}.json`).then((r) => r.json());
}

const generateText = generateButton.querySelector(".generate-text");
const loadingText = generateButton.querySelector(".loading-text");
const loadingPromptsText = generateButton.querySelector(
  ".loading-prompts-text",
);

// Disable button until prompts load
generateButton.disabled = true;
generateText.style.display = "none";
loadingText.style.display = "none";
loadingPromptsText.style.display = "block";

let hellPrompts = [];
applyTranslations(currentLang);
loadPrompts(currentLang)
  .then((data) => {
    hellPrompts = data;
    generateButton.disabled = false;
    loadingPromptsText.style.display = "none";
    generateText.style.display = "block";
  })
  .catch((err) => console.error("Failed to load prompts:", err));

// Load prompt history from localStorage and keep the latest five prompts
let promptHistory = JSON.parse(
  localStorage.getItem("promptHistory") || "[]",
).slice(0, 5);

// Display history items
function updateHistoryDisplay() {
  historyList.innerHTML = "";
  promptHistory.slice(0, 5).forEach((prompt, index) => {
    const historyItem = document.createElement("div");
    historyItem.className = "history-item";
    historyItem.textContent = prompt;
    historyItem.addEventListener("click", () => {
      displayPrompt(prompt);
    });
    historyList.appendChild(historyItem);
  });
}

// Display a prompt
function displayPrompt(prompt) {
  promptText.textContent = prompt;
  promptText.classList.remove("placeholder-text");
  promptBox.classList.add("generated");
}

// Generate a random prompt
function generateRandomPrompt() {
  if (hellPrompts.length === 0) return;

  // Show loading state
  generateText.style.display = "none";
  loadingText.style.display = "block";

  // Simulate loading time
  setTimeout(() => {
    // Get random prompt
    const randomIndex = Math.floor(Math.random() * hellPrompts.length);
    const randomPrompt = hellPrompts[randomIndex];

    // Display the prompt
    displayPrompt(randomPrompt);

    // Add to history
    if (!promptHistory.includes(randomPrompt)) {
      promptHistory.unshift(randomPrompt);
      promptHistory = promptHistory.slice(0, 5); // Keep only 5 items
      localStorage.setItem("promptHistory", JSON.stringify(promptHistory));
      updateHistoryDisplay();
    }

    // Reset button state
    generateText.style.display = "block";
    loadingText.style.display = "none";
  }, 1500);
}

// Copy prompt to clipboard
function copyPromptToClipboard() {
  const textToCopy = promptText.textContent;
  if (textToCopy && !promptText.classList.contains("placeholder-text")) {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        const originalText = copyButton.textContent;
        copyButton.textContent = translations[currentLang].copied;
        setTimeout(() => {
          copyButton.textContent = originalText;
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  }
}

// Event listeners
generateButton.addEventListener("click", generateRandomPrompt);
copyButton.addEventListener("click", (e) => {
  e.stopPropagation();
  copyPromptToClipboard();
});
langToggle.addEventListener("click", (e) => {
  const lang = e.target.dataset.lang;
  if (!lang || lang === currentLang) return;
  currentLang = lang;
  localStorage.setItem("lang", currentLang);
  applyTranslations(currentLang);
  generateButton.disabled = true;
  loadingPromptsText.style.display = "block";
  generateText.style.display = "none";
  loadPrompts(currentLang)
    .then((data) => {
      hellPrompts = data;
      generateButton.disabled = false;
      loadingPromptsText.style.display = "none";
      generateText.style.display = "block";
    })
    .catch((err) => console.error("Failed to load prompts:", err));
});

// Initialize history display
updateHistoryDisplay();
