document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.carousel-track');
    const dots = document.querySelectorAll('.dot');

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = dot.getAttribute('data-index');
            const slideWidth = window.innerWidth;
            track.style.transform = `translateX(-${index * slideWidth}px)`;

            dots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
        });
    });

    window.addEventListener('resize', () => {
        const activeDot = document.querySelector('.dot.active');
        if (activeDot) {
            const index = activeDot.getAttribute('data-index');
            const slideWidth = window.innerWidth;
            track.style.transform = `translateX(-${index * slideWidth}px)`;
        }
    });

    // Carousel Buttons
    const carouselTrack = document.getElementById('carouselTrack');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    let currentGroup = 0;
    const groupSize = 2;

    function getItemWidth() {
        const gap = 32; // Assuming 2rem = 32px
        return carouselTrack.children[0].offsetWidth + gap;
    }

    function scrollToGroup(index) {
        const scrollPosition = index * getItemWidth() * groupSize;
        carouselTrack.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }

    function updateButtons() {
        const totalItems = carouselTrack.children.length;
        const maxGroupIndex = Math.floor(totalItems / groupSize) - 1;

        prevBtn.style.display = currentGroup === 0 ? 'none' : 'block';
        nextBtn.style.display = currentGroup >= maxGroupIndex ? 'none' : 'block';
    }

    nextBtn.addEventListener('click', () => {
        const maxGroupIndex = Math.floor(carouselTrack.children.length / groupSize) - 1;
        if (currentGroup < maxGroupIndex) {
            currentGroup++;
            scrollToGroup(currentGroup);
            updateButtons();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentGroup > 0) {
            currentGroup--;
            scrollToGroup(currentGroup);
            updateButtons();
        }
    });

    window.addEventListener('load', updateButtons);
    window.addEventListener('resize', updateButtons);

    // Navbar Search Functionality
    const searchInput = document.querySelector('.navbar-top .search-bar input[type="text"]');
    const categorySection = document.getElementById('category');
    const categoryItems = categorySection.querySelectorAll('.Food-title');
    const navbar = document.querySelector('.navbar');

    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        removeSuggestions();

        if (searchTerm.length > 0) {
            const suggestions = [];
            categoryItems.forEach(item => {
                const categoryText = item.textContent.toLowerCase();
                if (categoryText.includes(searchTerm)) {
                    suggestions.push({ text: item.textContent, element: item });
                }
            });

            if (suggestions.length > 0) {
                displaySuggestions(suggestions);
            }
        }
    });

    function displaySuggestions(suggestions) {
        const suggestionBox = document.createElement('div');
        suggestionBox.classList.add('search-suggestions');
        searchInput.parentNode.appendChild(suggestionBox);

        suggestions.forEach(suggestion => {
            const suggestionItem = document.createElement('div');
            suggestionItem.classList.add('suggestion-item');
            suggestionItem.textContent = suggestion.text;
            suggestionItem.addEventListener('click', function () {
                scrollToElement(suggestion.element);
                searchInput.value = suggestion.text;
                removeSuggestions();
            });
            suggestionBox.appendChild(suggestionItem);
        });
    }

    function removeSuggestions() {
        const existingSuggestions = searchInput.parentNode.querySelector('.search-suggestions');
        if (existingSuggestions) {
            existingSuggestions.remove();
        }
    }

    function scrollToElement(element) {
        const offsetTop = element.getBoundingClientRect().top + window.scrollY;
        const navbarHeight = navbar ? navbar.offsetHeight : 0;

        window.scrollTo({
            top: offsetTop - navbarHeight,
            behavior: 'smooth'
        });
    }

    document.addEventListener('click', function (event) {
        if (!searchInput.parentNode.contains(event.target)) {
            removeSuggestions();
        }
    });

    // Login Popup Functionality
    const userIcon = document.querySelector('.icons a[href="#"] img[alt="User"]');
    const loginPopup = document.getElementById('loginPopup');
    const closeButton = loginPopup.querySelector('.close-button');
    const loginForm = document.getElementById('loginForm');

    if (userIcon && loginPopup) {
        userIcon.addEventListener('click', function (event) {
            event.preventDefault();
            loginPopup.style.display = "flex";
        });

        closeButton.addEventListener('click', function () {
            loginPopup.style.display = "none";
        });

        window.addEventListener('click', function (event) {
            if (event.target == loginPopup) {
                loginPopup.style.display = "none";
            }
        });

        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const email = loginForm.querySelector('#loginEmail').value;
            console.log("Signing in with email:", email);
            alert(`Signing in with email: ${email} (This is a frontend simulation)`);
            loginPopup.style.display = "none";
        });
    }

    // Basket Popup and Favorites Functionality
    const basketIcon = document.querySelector('.icons a[href="#"] img[alt="Basket"]');
    const basketPopup = document.getElementById('basketPopup');
    const closeBasketButton = basketPopup.querySelector('.close-button');
    const basketItemsContainer = document.getElementById('basket-items');
    const emptyBasketMessage = document.getElementById('empty-basket');
    const favoriteItemsContainer = document.getElementById('favorite-items');
    const emptyFavoritesMessage = document.getElementById('empty-favorites');
    const checkoutButton = document.getElementById('checkout-button');
    const heartButtons = document.querySelectorAll('.product-background .heart-button');
    const basketNotification = document.getElementById('basketNotification');
    const basketNotificationMessage = document.getElementById('basketNotificationMessage');

    let basket = []; // Array to store items in the basket
    let favorites = []; // Array to store favorite items

    // Function to update the basket display
    function updateBasketDisplay() {
        basketItemsContainer.innerHTML = '';
        if (basket.length === 0) {
            emptyBasketMessage.style.display = 'block';
        } else {
            emptyBasketMessage.style.display = 'none';
            basket.forEach(item => {
                const basketItemDiv = document.createElement('div');
                basketItemDiv.classList.add('basket-item');
                basketItemDiv.innerHTML = `
                    <div class="item-info">
                        <span class="item-name">${item.name}</span>
                        <span class="item-price">${item.price}</span>
                    </div>
                    <button class="remove-button" data-id="${item.id}">Remove</button>
                `;
                basketItemsContainer.appendChild(basketItemDiv);

                const removeButton = basketItemDiv.querySelector('.remove-button');
                removeButton.addEventListener('click', function() {
                    const itemIdToRemove = this.dataset.id;
                    basket = basket.filter(item => item.id !== itemIdToRemove);
                    updateBasketDisplay();
                });
            });
        }
    }

    // Function to update the favorites display
    function updateFavoritesDisplay() {
        favoriteItemsContainer.innerHTML = '';
        if (favorites.length === 0) {
            emptyFavoritesMessage.style.display = 'block';
        } else {
            emptyFavoritesMessage.style.display = 'none';
            favorites.forEach(item => {
                const favoriteItemDiv = document.createElement('div');
                favoriteItemDiv.classList.add('favorite-item');
                favoriteItemDiv.innerHTML = `
                    <div class="fav-item-info">
                        <span class="fav-item-name">${item.name}</span>
                        <span class="fav-item-price">${item.price}</span>
                    </div>
                    <button class="add-to-basket-from-fav" data-id="${item.id}">Add to Basket</button>
                `;
                favoriteItemsContainer.appendChild(favoriteItemDiv);

                const addToBasketFromFavButton = favoriteItemDiv.querySelector('.add-to-basket-from-fav');
                addToBasketFromFavButton.addEventListener('click', function() {
                    const itemIdToAdd = this.dataset.id;
                    const itemToAdd = favorites.find(favItem => favItem.id === itemIdToAdd);
                    if (itemToAdd) {
                        const addedToBasket = addItemToBasket(itemToAdd);
                        if (addedToBasket) {
                            favorites = favorites.filter(favItem => favItem.id !== itemIdToAdd);
                            updateFavoritesDisplay();
                            // Update the heart icon back to the default
                            const heartButton = Array.from(heartButtons).find(btn => {
                                const productNameElement = btn.closest('.product-background').querySelector('.product-name');
                                return productNameElement && productNameElement.textContent.replace(/\s+/g, '-').toLowerCase() === itemIdToAdd;
                            });
                            if (heartButton) {
                                const heartImg = heartButton.querySelector('img');
                                if (heartImg) {
                                    heartImg.src = "../Assets/Heart.png";
                                    heartImg.alt = "Add to Favorites";
                                }
                            }
                        }
                    }
                });
            });
        }
    }

    // Function to add an item to the basket
    function addItemToBasket(item) {
        const existingItem = basket.find(i => i.id === item.id);
        if (existingItem) {
            basket.push(item);
        } else {
            basket.push(item);
        }
        updateBasketDisplay();
        showBasketNotification(`${item.name} has been added to your basket.`);
        return true; // Indicate success
    }

    function showBasketNotification(message) {
        basketNotificationMessage.textContent = message;
        basketNotification.classList.add('show');
        setTimeout(() => {
            basketNotification.classList.remove('show');
        }, 3000);
    }

    // --- Event Listeners for Basket Popup ---
    if (basketIcon && basketPopup && closeBasketButton) {
        basketIcon.addEventListener('click', function (event) {
            event.preventDefault();
            basketPopup.style.display = "block";
            updateBasketDisplay();
            updateFavoritesDisplay();
        });

        closeBasketButton.addEventListener('click', function () {
            basketPopup.style.display = "none";
        });

        window.addEventListener('click', function (event) {
            if (event.target == basketPopup) {
                basketPopup.style.display = "none";
            }
        });

        checkoutButton.addEventListener('click', function() {
            alert("Proceeding to Checkout (Not yet implemented)");
            console.log('Basket:', basket);
            // Implement checkout logic
        });
    }

    // --- Event Listeners for Heart Buttons ---
    heartButtons.forEach(button => {
        const heartImg = button.querySelector('img');

        button.addEventListener('click', function() {
            const productBackground = this.closest('.product-background');
            const productName = productBackground.querySelector('.product-name').textContent;
            const productPrice = productBackground.querySelector('.price').textContent;
            const productId = productName.replace(/\s+/g, '-').toLowerCase();
            const item = { id: productId, name: productName, price: productPrice };

            const isFavorited = favorites.find(favItem => favItem.id === item.id);

            if (!isFavorited) {
                favorites.push(item);
                updateFavoritesDisplay();
                heartImg.src = "../Assets/Heart-Red.png"; // Path to your red heart image
                heartImg.alt = "Remove from Favorites";
                showBasketNotification(`${productName} added to favorites!`);
            } else {
                favorites = favorites.filter(favItem => favItem.id !== item.id);
                updateFavoritesDisplay();
                heartImg.src = "../Assets/Heart.png"; // Path to your default heart image
                heartImg.alt = "Add to Favorites";
                showBasketNotification(`${productName} removed from favorites.`);
            }
            console.log('Favorites:', favorites);
        });
    });

    // --- Event Listeners for "Add To Basket" buttons on product cards ---
    const productBasketButtons = document.querySelectorAll('.product-background .product-button');
    productBasketButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productBackground = this.closest('.product-background');
            const productName = productBackground.querySelector('.product-name').textContent;
            const productPrice = productBackground.querySelector('.price').textContent;
            const productId = productName.replace(/\s+/g, '-').toLowerCase();

            addItemToBasket({ id: productId, name: productName, price: productPrice });
        });
    });
});