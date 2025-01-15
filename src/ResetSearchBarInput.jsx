import React, { useEffect } from 'react';

function resetSearchBarInput() {
    let userInput = document.querySelector('.search-box');
    let navButtons = document.querySelectorAll('.navbar li');

    navButtons.forEach(element => {
        element.addEventListener('click', function () {
            userInput.value = "";
        })
    });

}

export default resetSearchBarInput;