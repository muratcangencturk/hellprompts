    const promptBox = document.getElementById('promptBox');
    const promptText = document.getElementById('promptText');
    const generateButton = document.getElementById('generateButton');
    const copyButton = document.getElementById('copyButton');
    const historyList = document.getElementById('historyList');
    const flameLogo = document.getElementById('flameLogo');

    const generateText = generateButton.querySelector('.generate-text');
    const loadingText = generateButton.querySelector('.loading-text');
    const loadingPromptsText = generateButton.querySelector('.loading-prompts-text');

    // Disable button until prompts load
    generateButton.disabled = true;
    generateText.style.display = 'none';
    loadingText.style.display = 'none';
    loadingPromptsText.style.display = 'block';

    let hellPrompts = [];
    fetch('hellPrompts.json')
      .then(r => r.json())
      .then(data => {
        hellPrompts = data;
        generateButton.disabled = false;
        loadingPromptsText.style.display = 'none';
        generateText.style.display = 'block';
      })
      .catch(err => console.error('Failed to load prompts:', err));

    // Initialize prompt history as an in-memory array instead of using localStorage
    let promptHistory = [];
    
    // Display history items
    function updateHistoryDisplay() {
      historyList.innerHTML = '';
      promptHistory.slice(0, 5).forEach((prompt, index) => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.textContent = prompt;
        historyItem.addEventListener('click', () => {
          displayPrompt(prompt);
        });
        historyList.appendChild(historyItem);
      });
    }

    // Display a prompt
    function displayPrompt(prompt) {
      promptText.textContent = prompt;
      promptText.classList.remove('placeholder-text');
      promptBox.classList.add('generated');
    }

    // Generate a random prompt
    function generateRandomPrompt() {

      if (hellPrompts.length === 0) return;
      
      // Show loading state
      generateText.style.display = 'none';
      loadingText.style.display = 'block';
      
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
          updateHistoryDisplay();
        }
        
        // Reset button state
        generateText.style.display = 'block';
        loadingText.style.display = 'none';
      }, 1500);
    }

    // Copy prompt to clipboard
    function copyPromptToClipboard() {
      const textToCopy = promptText.textContent;
      if (textToCopy && !promptText.classList.contains('placeholder-text')) {
        navigator.clipboard.writeText(textToCopy)
          .then(() => {
            const originalText = copyButton.textContent;
            copyButton.textContent = 'Copied!';
            setTimeout(() => {
              copyButton.textContent = originalText;
            }, 2000);
          })
          .catch(err => {
            console.error('Failed to copy: ', err);
          });
      }
    }

    // Event listeners
    generateButton.addEventListener('click', generateRandomPrompt);
    copyButton.addEventListener('click', (e) => {
      e.stopPropagation();
      copyPromptToClipboard();
    });
    
    // Initialize history display
    updateHistoryDisplay();

