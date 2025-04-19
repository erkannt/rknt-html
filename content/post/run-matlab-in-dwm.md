---
title: Running Matlab in DWM
---

After installing Matlab 2024b on my void linux machine I could launch it with `matlab` but after the splash screen there was only a partially rendering windows that had "Ready" written at the bottom.

I solved this as follows: 

- install `wmname`  
  This is available via the regular xbps packages and allows chaing the window manager name.
- run `wmname LG3D &` prior to launching Matlab

I came across this solution in an [Arch forum post](https://bbs.archlinux.org/viewtopic.php?id=285988). I did not need to set the env var the post suggests setting.
