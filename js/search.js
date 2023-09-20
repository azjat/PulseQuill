const funnySearches = [
    "Why is my goldfish swimming upside down?",
    "Unicorns are real",
    "Why aren't there b batteries?",
    "Why is my cat so weird?",
    "Why can't I own a Canadian?",
    "Why isn't 11 pronounced onety one?",
    "Can I eat my cat?",
    "Can I eat my himalayan salt lamp?",
    "I think i might be a furry",
    "Why do men like boobs?",
    "Google will eat itself",
    "Is it normal to be sexually attracted to numbers?",
    "Never put a sock in a toaster",
    "Cats like hitler",
    "7 times 14",
    "Is it impossible to lick your elbow?",
    "Who would win a fight between a grilled cheese and a taco?",
    "Sometimes when I'm alone I google myself",
    "What are these strawberries doing on my nipples I need them for the fruit salad",
    "Can I marry a mexican?",
    "Why are there school girls in my backyard?",
    "Penguins are planning to take over the world",
    "My cat is plotting to kill me",
    "The world is going to end in 2024",
    "I'm a potato",
    "Bees are planning to take over the world",
    "Vampires are real",
    "Do you ever feel like a plastic bag?",
    "Babies are made of cheese",
    "Green eggs and ham",
    "Mnemonics are hard to remember",
    "56 is the meaning of life",
    "Bananas are radioactive",
    "Why do cats eat grass?",
    "Why do kitties ask for food at 4am?",
    "Can fish drink vodka?",
    "Why does my fish not move after drinking vodka?",
    "How to get rid of a dead body?", 
    "How to get rid of a dead body in a desert?",
    "How to get rid of a dead body in a volcano?",
    "Where to buy drugs?",
    "Where to buy drugs in a desert?",
    "Where to buy drugs in a volcano?", 
    "How to hide from the police?",
    "How to hide from the police in a desert?",
    "How to hide from the police in a volcano?",
    "How to make a bomb?",
    "How to make a bomb in a desert?",
    "How to make a bomb in a volcano?",
    "Flying airplanes tutorial for beginners",
    "How to fly an airplane in a desert?",
    "How to fly an airplane in a volcano?",
    "Can I eat a volcano?",
    "Can I eat a volcano in a desert?",
    "Can I eat a desert?",
    "Can I eat a desert in a volcano?",
    "How to make a volcano?",
    "How to make a desert?",
    "How to raise your IQ by eating gifted children?",
    "How to get ahold of a gay unicorn?",
    "How to get ahold of a heterosexual unicorn?",
    "How to get ahold of a bisexual unicorn?",
    "Can I eat a unicorn?",
    "Is it normal to speak to watermelons?",
    "Is it possible that I'm a potato?",
    "Can you survive a nuclear explosion by hiding in a fridge?",
    "Can you build a nuclear reactor in your backyard?",
    "How to build a nuclear reactor in your backyard?",
    "Why is my cat reading my diary?",
    "Why does my cat plot to take over the world?",
    "Why does my cat train squirrels to attack me?",
    "Why do my squirrels train cats to attack me?",
    "What's up with the cat and squirrel conspiracy?",
    "Are pigeons planning to take over the world?",
    "Are pigeons government spies?",
    "Are pigeons aliens?",
    "Are pigeons robots?",
    "Are pigeons real?",
    "Why do pigeons explode when they eat rice?",
    "Why do pigeons have antennas in their butts?",
];

randomIndex = () => {
    let index;
    do {
        index = Math.floor(Math.random() * funnySearches.length);
    } while (index >= funnySearches.length || localStorage.getItem('lastSearch') == index);
    localStorage.setItem('lastSearch', index);
    return index;
};

const placeholder = funnySearches[randomIndex()];

const searchForm = document.querySelector('.i-container');
const searchInput = document.querySelector('.i-input');
const searchIcon = document.querySelector('.i-icon');
searchInput.placeholder = placeholder;

searchForm.addEventListener('submit', function(event) {
    const searchQuery = searchInput.value;    
    if (searchQuery.trim() !== '') {
        const searchUrl = `https://www.google.com/search?q=${searchQuery}`;
        window.location.href = searchUrl;
    }
    event.preventDefault();
});

searchIcon.addEventListener('click', function() {
    const searchQuery = searchInput.value; 
    if (searchQuery.trim() !== '') {
    searchForm.dispatchEvent(new Event('submit'));
    }
});

searchInput.addEventListener('keydown', function(event) {
    if (event.keyCode === 9 && searchInput.value.trim() === '') {
        event.preventDefault();
        searchInput.value = placeholder;
    }
});
