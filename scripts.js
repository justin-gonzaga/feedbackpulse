// Global variables to store code samples for both languages
const codeSamples = {
    python: {},
    sql: {}
};

// Load code samples and set up the page
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Load Python code samples
        codeSamples.python.sample1 = await fetchCodeSample('sample1.py');
        codeSamples.python.sample2 = await fetchCodeSample('sample2.py');
        codeSamples.python.sample3 = await fetchCodeSample('sample3.py');
        
        // Load SQL code samples
        codeSamples.sql.sample1 = await fetchCodeSample('sql-sample1.sql');
        codeSamples.sql.sample2 = await fetchCodeSample('sql-sample2.sql');
        codeSamples.sql.sample3 = await fetchCodeSample('sql-sample3.sql');
        
        // Insert Python code samples into HTML
        document.getElementById('code-sample1').textContent = codeSamples.python.sample1;
        document.getElementById('code-sample2').textContent = codeSamples.python.sample2;
        document.getElementById('code-sample3').textContent = codeSamples.python.sample3;
        
        // Insert SQL code samples into HTML
        document.getElementById('code-sql-sample1').textContent = codeSamples.sql.sample1;
        document.getElementById('code-sql-sample2').textContent = codeSamples.sql.sample2;
        document.getElementById('code-sql-sample3').textContent = codeSamples.sql.sample3;
        
        // Initialize syntax highlighting
        hljs.highlightAll();
        
        // Set up language switching
        setupLanguageSwitch();
        
        // Set up tab switching
        setupTabs();
        
        // Set up form submission
        setupFeedbackSubmission();
        
        // Set up download buttons
        setupDownloadButtons();
        
        // Set initial language to Python
        switchLanguage('python');
        
    } catch (error) {
        console.error('Error loading code samples:', error);
    }
});

// Function to fetch code samples
async function fetchCodeSample(filename) {
    try {
        const response = await fetch(filename);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.text();
    } catch (error) {
        console.error(`Error fetching ${filename}:`, error);
        return `# Error loading ${filename}\n# Please check the console for details`;
    }
}

// Function to set up language switching
function setupLanguageSwitch() {
    const languageSelect = document.getElementById('language-select');
    
    languageSelect.addEventListener('change', function() {
        const selectedLanguage = this.value;
        switchLanguage(selectedLanguage);
    });
}

// Function to switch between languages
function switchLanguage(language) {
    // First hide all language-specific content
    document.body.classList.remove('python-active', 'sql-active');
    
    // Then show content for the selected language
    document.body.classList.add(`${language}-active`);
    
    // Update the language selector value
    document.getElementById('language-select').value = language;
    
    // Show first tab for the active language
    const activeLangContent = document.querySelector(`.${language}-content`);
    if (activeLangContent) {
        // Find the first tab button in each content area and click it
        const firstTabBtn = activeLangContent.querySelector('.tab-btn');
        if (firstTabBtn) {
            firstTabBtn.click();
        }
    }
}

// Function to set up tab switching
function setupTabs() {
    // Get all tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    // Add click event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the tab container
            const tabContainer = this.closest('.panel');
            
            // Get the tab ID to show
            const tabToShow = this.getAttribute('data-tab');
            
            // Remove active class from all buttons in this container
            tabContainer.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Remove active class from all tab contents in this container
            tabContainer.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Add active class to corresponding tab content
            const targetContent = document.getElementById(tabToShow);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Function to set up feedback submission
function setupFeedbackSubmission() {
    const submitButton = document.getElementById('submit-btn');
    const feedbackTextarea = document.getElementById('feedback-text');
    
    submitButton.addEventListener('click', function() {
        const feedback = feedbackTextarea.value.trim();
        
        if (feedback === '') {
            alert('Please write feedback before submitting');
            return;
        }
        
        // Get active language and sample
        const activeLanguage = document.body.classList.contains('python-active') ? 'python' : 'sql';
        
        // Get active sample tab from the active language panel
        const activeLangPanel = document.querySelector(`.${activeLanguage}-content.panel`);
        const activeTab = activeLangPanel.querySelector('.tab-btn.active');
        const activeSample = activeTab ? activeTab.getAttribute('data-tab') : 'unknown';
        
        // In a real application, this would send the feedback to a server
        console.log(`Submitting feedback for ${activeLanguage} - ${activeSample}:`, feedback);
        
        // For demonstration purposes, show a success message
        alert(`Feedback for ${activeLanguage.toUpperCase()} Sample ${activeSample.replace(/[^\d]/g, '')} submitted successfully!`);
        
        // Clear the textarea
        feedbackTextarea.value = '';
    });
}

// Function to set up download buttons
function setupDownloadButtons() {
    const downloadButtons = document.querySelectorAll('.download-btn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filename = this.getAttribute('data-file');
            let content;
            
            // Determine the language from the filename
            const fileLanguage = filename.endsWith('.py') ? 'python' : 'sql';
            
            // Get the sample id from the filename
            let sampleId;
            if (fileLanguage === 'python') {
                sampleId = filename.replace('.py', '');
            } else { // SQL
                sampleId = filename.replace('.sql', '');
            }
            
            // Get the content based on the filename
            if (fileLanguage === 'python') {
                if (sampleId === 'sample1') content = codeSamples.python.sample1;
                else if (sampleId === 'sample2') content = codeSamples.python.sample2;
                else if (sampleId === 'sample3') content = codeSamples.python.sample3;
            } else { // SQL
                if (sampleId === 'sql-sample1') content = codeSamples.sql.sample1;
                else if (sampleId === 'sql-sample2') content = codeSamples.sql.sample2;
                else if (sampleId === 'sql-sample3') content = codeSamples.sql.sample3;
            }
            
            if (!content) {
                alert('File not found');
                return;
            }
            
            // Create a blob with the content
            const mimeType = fileLanguage === 'python' ? 'text/x-python' : 'text/plain';
            const blob = new Blob([content], { type: mimeType });
            
            // Create a URL for the blob
            const url = URL.createObjectURL(blob);
            
            // Create a temporary anchor element
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            
            // Trigger a click on the anchor
            document.body.appendChild(a);
            a.click();
            
            // Clean up
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    });
}