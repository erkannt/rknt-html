---
title: Cygnus Chonk
---

A remix of the beautiful [Cygnus keyboard](https://github.com/juhakaup/keyboards/tree/main/Cygnus%20v1.0)

![](./finished-pair.jpg)


## Changes made

- dual 1.5u thumbs (incl. minor positioning change)
- printability tweaks by chamfering or cutting away little protrusions on the inside
- assembly tweaks by cutting away mor of the thumb cluster boss

My keyboard journey has been Ergodox, gergo, [neuro36](https://github.com/erkannt/neuro36).
Hence the 'need' for dual chonky thumbs.

## Assembly notes

- all other pieces, BOM etc. taken from original repo
- case printed in matte white PLA on Bambu X1C with tree supports
- case sanded to 220 grit
- took me a while to realise which pads I could use to make the wiring in the thumb cluster easier
- one or two PCBs need clipping, sanding to fit
- used stranded wire as that was the only multi-colour I had, solid core would probably have been easier
- handwiring takes a lot longer than the usual single PCB approach I know but is oddly meditative
- only one flipped diode and two dodgy solder joints...
- used [RP2040-Zero](https://www.waveshare.com/wiki/RP2040-Zero) so that I could easily port my neuro36 QMK
- the TRRS socket mounting is nicely engineered and rock solid
- chamfered controller/socket holder with clippers to easy assembly


{{ folder_gallery(folder="assembly") }}

## Files

<div class="viewer" data-src="/post/cygnus-chonk/cygnus--chonk.stl"></div>

- [Fusion360](./cygnus--chonk.f3z)
- [STEP](./cygnus--chonk.step)
- [STL](./cygnus--chonk.stl)

![](./finished-single.jpg)

<script src="/stl-viewer.js" type="module"></script>
<link rel="stylesheet" href="/stl-viewer.css" />