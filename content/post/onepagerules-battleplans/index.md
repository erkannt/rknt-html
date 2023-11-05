---
title: OnePageRules Battleplans
---

Inspired by [ULC Battle Reports](https://www.youtube.com/watch?v=8nhhRVgH-_E) this is how we currently play OnePageRules skirmish games using WarCry battleplan cards.

- fast setup as there are fewer decisions
- games feel unique
- encourages storytelling and a cinematic feel

## Process

1. Roll-off, winner decides if they want to be _Attacker_ or _Defender_
2. Starting with the _Defender_ take turns naming units as _Sword_, _Hammer_ or _Shield_  
   You must balance your models/toughness points as evenly as possible.  
	 <small>We place our minis on [this A4 tableu](./warcry-warband-tableu.svg).<br>This is also a great moment to explain your units stats and rules to the other player.</small>
3. Reveal the [Terrain card](#terrain)  
   <small>Shuffle until you have one that works for the terrain you've got.</small>
4. Reveal the _Deployment_ card  
   _Defender_ picks if they want to be _blue_ or _red_.
5. Reveal the _Victory_ card
6. Start playing, _Attacker_ has initiative

## Rules

Standard OnePageRules skirmish rules but:
- deployment and victory conditions are determined using Warcry Cards
- _Scout_ allows the unit to take a _Move_ action at the beginning of the round they are deployed in
- _Ambush_ units cannot deploy before round 2 or the round in which the card tells them to deploy. They may ignore the deployment position of the card and follow _Ambush_ deployment rules instead.

## Cards

### Terrain

{{ shuffle_cards(folder="terrain") }}

{{ shuffle_cards(folder="deployment") }}

{{ shuffle_cards(folder="victory") }}


## Misc.

Recommendations:
- use _Kitchen Table_ distances and board size i.e. 2'x2' or 22"x30" board and halve all distances in the rules.
- follow _competitive validation_/_Force Org._ rules and play with 200pt armies

Ideas for further constraints:
- limit armies to one non-hero _Tough_ unit
- limit armies to 10/12 _Tough_ points/model counts


<script>
  const shuffle = (element) => () => {
    const previouslySelected = element.querySelector(".card[selected]");
    if (previouslySelected) {
      previouslySelected.toggleAttribute("selected");
    }
    const cards = element.getElementsByClassName("card");
    const selectedIndex = Math.floor(Math.random() * cards.length);
    cards[selectedIndex].toggleAttribute("selected");
  }

  const toggleVisibility = (element) => () => {
    const cards = element.getElementsByClassName("card");
    const button = element.querySelector(".shuffle-cards__toggle-visibility");
    if (button.innerText.includes("Hide")) {
      for (const card of cards) {
        card.classList.add("card--hidden")
      }
      button.innerText = button.innerText.replace("Hide", "Reveal")
    } else {
      for (const card of cards) {
        card.classList.remove("card--hidden")
      }
      button.innerText = button.innerText.replace("Reveal", "Hide")
    }
  }

  const allShuffleCards = document.querySelectorAll(".shuffle-cards");

  for (const shuffleCards of allShuffleCards) {
    console.log(shuffleCards);
    shuffle(shuffleCards)();

    const shuffleCardsToggle = shuffleCards.querySelector(".shuffle-cards__toggle-visibility");
    shuffleCardsToggle.addEventListener("click", toggleVisibility(shuffleCards))

    const shuffleCardsShuffle = shuffleCards.querySelector(".shuffle-cards__shuffle");
    shuffleCardsShuffle.addEventListener("click", shuffle(shuffleCards))
  }
</script>