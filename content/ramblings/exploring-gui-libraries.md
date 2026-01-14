---
title: Exploring GUI Libraries
date: 2026-01-12T19:43:29+00:00
---
My latest _professional development days (PDD)_ turned into a lesson on yak-shaving, GUI frameworks and my relationship to learning.

For my last PDDs of 2025 I wanted to investigate Activity Pub for server to server communication. Activity Pub is a protocol used by the Bonfire Network (which we are involved in), Mastodon and other parts of the Fediverse.

To explore Activity Pub I wanted to build a simple image sharing server and client app. I had been playing around with this idea during the end of my sabbatical as it would serve a need of mine. So I had some parts in place before starting the PDD.

In theory a personally useful project should be a great motivator for learning. What I got instead was a _teachable moment_.

Several factors derailed my efforts:
- The project wasn't ready to add Activity Pub when I started the PDD.
- I had never built a mobile application.
- Federated system means lots of moving parts.
- I had never written tests for a federated system.

I had also tried to shortcut my way to a working system:
- Ran the "mobile" client in the browser on my computer instead of actual Android Devices.
- Used LLMs to generate significant chunks of the server code.
- Build the client using [Fyne](https://fyne.io/) to use the same programming language I had used for the server.

Running the client in the browser was great (fast feedback loop, familiar dev tools). The other two didn't pan out:

- Quick and dirty LLM code made it hard to reason about the server behaviour and add missing functionality.
- I got distracted and overwhelmed by designing client side state management.
- Fyne was frustrating as it has a small user base, resulting in limited LLM support and sparse documentation and examples.

The LLM code, quick and dirty feature growth and unfamiliar GUI tooling meant I didn't have any tests or even testable code. So I had to resort to manual testing and that of course is slow and frustrating.

So by the second day I abandoned the goal of learning about Activity Pub and instead started experimenting with more mainstream mobile app development. At some point David suggested looking into Progressive Web Apps. I continued this journey through christmas while recovering from COVID.

## Mobile App libraries/frameworks I tried
All of these promise cross platform development, i.e. write your app once and it will run on Mac OS, Windows, Linux, Android, iOS.

### [Fyne](https://fyne.io)
Fyne is a lightweight Go library for cross‑platform GUIs. I found the layout system unintuitive and the documentation was at times outdated. Struggling to center a text input in a page felt like CSS of yesteryear.

### [Flutter](https://flutter.dev/)
Flutter, Google’s Dart‑based UI toolkit, required a complex setup that I couldn’t get running, so I bailed without getting the hello world to run.

### [React Native](https://reactnative.dev/) with [Expo Framework](https://expo.dev/)
React Native (via Expo) let me run the app in a browser and an Android emulator with minimal pain, but the heavy JavaScript dependency chain and my unfamiliarity with React made me pivot yet again.

## Switching to PWAs

At this point I also decided to try building a [Progressive Web App](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) instead of a mobile app. Things that led me down this path:
- Writing semantic HTML + CSS is what I am used to.
- [What PWA can do today](https://whatpwacando.today/) a great overview of what is possible including code examples
- Several tools exist to bundle PWAs into native apps that can install via app stores
	- [PWA builder](https://www.pwabuilder.com/) 
	- [Capacitor](https://capacitorjs.com/)
	- [Apache Cordova](https://cordova.apache.org/)

So now I wanted to explore ways to build a clientside browser application. I have built several little tools using vanilla JS/TS, but suspected that I could benefit from libraries to tackle state management, navigation etc.

## Web App libraries/frameworks I tried
### [Leptos](https://leptos.dev)
Wanting saner tooling I thought I'd check out offerings from the Rust world. Previously I had used [seed](https://github.com/seed-rs/seed) to build [text2tabletop](https://text2tabletop.rknt.de/) . It uses 'The Elm Architecture' (TEA) which I knew from building [freeyourscience](https://freeyourscience.or) in Elm. However seed is no longer maintained, so I tried Leptos.

I liked writing regular HTML, struggled with the React inspired model, but finally bounced off the Rust syntax. A quote that sums it up for me:

> Go is too simple to write complicated programs, while Rust is too complicated to write simple programs. It all depends which problem you’d rather have.  
> -- [John Arundel](https://bitfieldconsulting.com/posts/rust-vs-go)

### [Elm Land](https://elm.land)
I really resonated with [The Elm Architecture](https://guide.elm-lang.org/architecture/) (TEA) in the past:
- `Model`: a type describing all possible states of the application
- `View`: takes the `Model` and renders it to HTML; can emit `Messages`
- `Update`: receives the `Messages` and updates the `Model`

Thanks to the algebraic data types and pattern matching of Elm, it becomes possible to express valid application states purely with types[^1]. Subsequently the compiler guides you through the actual implementation.

Elm's latest release is six years old at this point. So at least there isn't any churn. There is a [somewhat active community](https://elmcraft.org/). It is interesting to see that there is [fork of the compiler](https://github.com/Zokka-Dev/zokka-compiler/) and two languages descended from it: [Gren](https://gren-lang.org/) and [Roc](https://www.roc-lang.org/). 

Elm land brings some of the more recent web development patterns e.g components and file based routing to Elm. It was nice to come back to TEA, but having to write HTML with elm code was too much for me.
```elm
  div []
    [ button [ onClick Decrement ] [ text "-" ]
    , div [] [ text (String.fromInt count) ]
    , button [ onClick Increment ] [ text "+" ]
    ]
```

Also whenever you need to interact with browser features like local storage or service workers you need to write ports to go from Elm to JS and back.

### [Svelte](https://svelte.dev/)
So back to the JS-ecosystem we so dearly love. Learning that Svelte had gone through a major change [just over a year ago](https://svelte.dev/blog/svelte-5-is-alive) made sceptical. However, the resulting structure feels like a very elegant way of representing reactive state. Also the underlying philosophy playing nice with existing JS libraries makes it feel like an extension in capability (similar to TS) rather than a new language and ecosystem (looking at you JSX). 

Searching for learning resources I found [7 GUIs](https://eugenkiss.github.io/7guis/tasks/). Working through them and then checking the corresponding [Svelt walkthrough](https://www.youtube.com/watch?v=afLUZz_7ySc) was a nice way to spend a day. Regardless of which GUI tooling you are using I'd highly recommend working through the 7 GUI tasks.

What really blew mind was creating an interactive SVG. Seeing circles change their size in real-time as I moved a slider did something to my brain. I think it was one of those moments where you realise that you can now make things you previously thought were out of reach. Or as [others have put it](https://www.youtube.com/watch?v=zweMkuQc3pU):

> Skill is the beginning of freedom.

## My takeaways

The key takeaway of course is that __quick and dirty becomes slow and tedious__ faster than you think.

Testable code leads to:
- better separation of concerns
- behaviour we can reason about
- tests that can express our next experiment
- super fast feedback
- enjoyable coding

However it takes me a while to understand the problem domain and tooling enough to know how to structure my code into something testable.

## Tools I'll use moving forward
- Use the __7 GUIs__ tasks to evaluate and learn GUI tooling.
- If I'm building for the web using __JS is the path of least resistance__ as it is the substrate we have to live with.
- For highly interactive systems that need to run locally for speed or decentralisation reasons I'll be going with __Svelte for now__.
- For progressive enhancement of server rendered HTML I'll continue reaching for __Go + Templ + HTMX__.
- Always favour tools that let me write __plain HTML__, ideally with IDE auto-complete and -formatting, and typesafe templating.
- __Pico CSS__ to quickly slap some styling on things without polluting things with classes. It's SASS structure makes it relatively easy to disable features you want to style yourself (I did this for `<dialog>` elements).
### Threads to pull on
- __Isomorphic tooling__: writing server and clientside code in one place and letting a compiler beform the separation and build the messaging. Both Leptos and Svelte Kit are offering this.
- __WebAssembly tooling__: The Seed repo links to a good [overview of Rust Frontend Frameworks](https://github.com/flosse/rust-web-framework-comparison#frontend-frameworks-wasm).
- __Component styles__: I really enjoyed how Svelte allows me to write styles just for the current component. Combined with global styles e.g. Pico CSS or other classless styling it seems to lead to a habitable co-location of content, behaviour and styling. Not having to think about class names for everything is nice. I'm curious if I can achieve something similar when using Templ on the server.
- __Roc__: A spiritual successor of Elm, brainchild of Richard Feldman (who greatly influenced my Elm journey). Still early days for a programming language, but after listening to an [interview with Richard](https://changelog.com/podcast/645) and reading through their FAQ, I am very excited to see where it goes.

[^1]: Richard Feldman gave a great talk on this titled [Making Impossible States Impossible](https://www.youtube.com/watch?v=IcgmSRJHu_8). He is also the person behind [Roc](https://www.roc-lang.org/).
