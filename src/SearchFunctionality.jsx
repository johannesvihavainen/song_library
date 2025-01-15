import React, { useEffect } from 'react';

function SearchFunctionality() {
    useEffect(() => {

        const updateListeners = () => {
            const getDrinkTitle = document.querySelectorAll('.drink-title');
            const getInput = document.querySelector('.search-box');
            const preppingGuideContainer = document.querySelector('.prepping-guide-container');

            if (!getInput) return;

            const handleSearch = () => {
                const inputValue = getInput.value.toUpperCase();

                for (let i = 0; i < getDrinkTitle.length; i++) {
                    const drinkTitle = getDrinkTitle[i].innerHTML.toUpperCase();

                    const itemWrapper = getDrinkTitle[i].closest('.item-wrapper');

                    if (drinkTitle.includes(inputValue)) {
                        itemWrapper.style.display = "block";
                        if (preppingGuideContainer) preppingGuideContainer.style.display = "block";
                    }
                    else {
                        itemWrapper.style.display = "none";
                        if (preppingGuideContainer) preppingGuideContainer.style.display = "none";
                    }
                }
            };

            getInput.addEventListener('input', handleSearch);

            return () => {
                getInput?.removeEventListener('input', handleSearch);
            };
        };

        updateListeners();

        const observer = new MutationObserver(() => {
            updateListeners();
        })

        observer.observe(document.body, { childList: true, subtree: true });

        return () => observer.disconnect();

    }, []);

    return null;
}

export default SearchFunctionality;