let translations = {}; // Store loaded translations

const label_enum = {
    en: {
        label_language: "English"
    },
    cn: {
        label_language: "中文"
    },
    bm: {
        label_language: "Bahasa Melayu"
    }
};

// Function to load the translation file based on the selected language
function loadLanguage(lang, callback) {
    $.getJSON('locales/' + lang + '.json?t=1.2.11', function (data) {
        translations[lang] = data; // Store translations for the language
        callback(data);
    }).fail(function () {
        console.log('Error loading language file for ' + lang);
        callback({}); // Call with empty object on error
    });
}

// Function to change the language and update the content
function changeLanguage(lang) {
    loadLanguage(lang, function (currentTranslations) {
        document.documentElement.lang = lang;  // Update the `lang` attribute
        const label = document.getElementById('label_language');

        // Update the text based on the selected language
        if (label){
            label.textContent = label_enum[lang].label_language;
        }
        
        $('[data-key]').each(function () {
            var key = $(this).attr('data-key');

            // Use the current translation if available, else fallback to English
            var text = currentTranslations[key] || translations['en'][key] || key;
            $(this).html(text);
        });

        // Store the selected language in localStorage
        localStorage.setItem('selectedLanguage', lang);
    });
}

// Load default language (English) or previously selected language on page load
$(document).ready(function () {
    // Check if a language is saved in localStorage
    let savedLanguage = localStorage.getItem('selectedLanguage') || 'en';

    // Load the English language first to ensure fallback support
    loadLanguage('en', function () {
        // After loading English, load other languages but do not update the content
        loadLanguage('cn', function () { });
        loadLanguage('bm', function () { });
        changeLanguage(savedLanguage); // Use the saved language or default to English
    });
});