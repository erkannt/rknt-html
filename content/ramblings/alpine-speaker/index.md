---
date: 2026-01-15T08:53:26Z
title: Why I run Alpine Linux on a speaker
---

{{ pic(path="./speaker-back.jpg", alt="RPi with amplifier hat in a 3D printed case mounted to the back of a speaker sitting on a messy desk.") }}

You have probably come across Alpine Linux in various Dockerfiles. I've come to use and love it as the Linux for my personal servers. The reason I am professing my love for Alpine right now, is that it plain delighted me during my efforts to bring Spotify Connect to a used bookshelf speaker.

## Why Alpine?

But first, why do you keep seeing `alpine` in your Dockerfiles? The most common reason is image size. The Alpine base image is remarkably small, clocking in at just 5MB. To put that in perspective, a single photograph taken by my phone will usually exceed that.

These days we also have the option of base images like `debian:slim` (22MB). In the early days of Docker these didn't exist. Consequently, if you wanted to keep your container image size down, Alpine was the way to go.

Alpine Linux was initially created for embedded applications like network routers, hence the focus on size and simplicity. They combine Busybox (for your common Unix tools), OpenRC (running services/daemons) and their own package manager `apk`. The result is a distro that, by default, does the bare minimum to provide a Linux system and then gets out of your way.

My speaker project involved strapping a Raspberry Pi 3B to the back of a used speaker off eBay. As a Raspberry Pi (RPi) comes with no way to drive a speaker I added a Hifiberry AMP hat. This attaches to the GPIO headers of the RPi, shows up as a soundcard and can drive speakers between 4-8 Ohms. It takes 12-18V and will power the RPi for you, so you end with a single power supply. I ambitiously got this RPi and amplifier eight years ago, but they are still fully supported by current sofware.

Initially I tried setting everything up with Raspbian via the official imager:
- Pi OS Lite image download is 487MB
- there seem to be five ways to set up WiFi, none of which worked for me
- the amount of services mentioned in the boot messages gave me the heeby jeebies (also way too slow)

So after that I grabbed the Alpine image (they have official images for RPis):
- 86MB download size
- fast boot
- easy to set up with a RAM disk (avoid thrashing SD card)
- `setup-alpine` got my WiFi working with no problems

Breath of fresh air, let me tell you. Going through the `setup-alpine` installer I actually had a smile on my face.

After confirming that the amplifier and speaker actually worked, the next step was to get it speaking Spotify Connect. This allows any Spotify client in the same network to play music from the speaker. Spotify Connect avoids streaming music from your phone or computer to the speaker. Instead, the Spotify client and speaker do a magic dance, authenticating the speaker with your credentials. Subsequently, the speaker streams the music directly from the Spotify servers.

I used [go-librespot](https://github.com/devgianlu/go-librespot) to give the speaker the Spotify Connect ability. There also is [librespot](github.com/librespot-org/librespot) which which is written in Rust. I found go-librespot after failing to get librespot to cross-compile for the RPi. As the name suggests, go-librespot is written in Go. So like the Rust based version is compiles to a single binary, making installation a simple case of copying a single file to the RPi.

However, the go-librespot binary file did not run. This is due to one of the reasons you might want to avoid Alpine for your container images: `musl`.

## Why not Alpine

Most Linux distributions and software rely on `glibc` (The GNU C Library). This the library that provides "such foundational facilities as open, read, write, malloc, printf, getaddrinfo, dlopen, pthread_create, crypt, login, exit and more" ([glibc homepage](https://www.gnu.org/software/libc/)). `musl` is an alternative implementation of the same APIs. It usually chosen for its smaller footprint (and surface area), easier static linking and cross-compilation.

Luckily there is the `gcompat` package for Alpine. This provides a compatibility layer for `glibc`. Apparently it does not work in all cases, but `go-librespot` runs perfectly fine.

And that is how I ended up re-enforcing my love of Alpine by building a speaker for our living room.

{{ pic(path="./finished-speaker.jpg", alt="Finished speaker sitting on a shelf with a 3D printed 'bercow' label. What else would you call a speaker?") }}
