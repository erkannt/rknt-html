---
title: Tidy up overlay2
---

When a server is running out of disk sometimes the culprit is a massive `/var/lib/docker/overlay2`.

This happens when the 'disk' content of a running container starts deviating from the state of the image.
Common culprits are caches and logfiles. The problem is finding out which container is causing the disk usage and how as the `overlay2` folder only contains IDs as folder names.

## Determine which container is using the most overlay2 space

You can use [du](https://linux.die.net/man/1/du) or [dust](https://github.com/bootandy/dust) for this.

```
du -s /var/lib/docker/overlay2/*/diff |sort -n -r | head

2023328 /var/lib/docker/overlay2/4487fc7aca3c48d41b33d2abcde734cb9fd5906f6e84085da0e450a035f222b7/diff
1439332 /var/lib/docker/overlay2/uwdztwikyvwny39bja2wlyd2m/diff
1081072 /var/lib/docker/overlay2/a4ac639273d8fcec1cf23df336f8b488f2b1861bbe6e39f438eace6491de69c5/diff
914856  /var/lib/docker/overlay2/dfbb9a28fedca1c1021637c1ec07ac54671c5d8638df90b8f7e3ab6beb2fa552/diff
903080  /var/lib/docker/overlay2/76a81f768a944492ecf6e3d5b12adfc8ad64e835cad379f5d54e11b3ea64e3d6/diff
873184  /var/lib/docker/overlay2/zfogtltelnayed85o7wi0eq37/diff
872860  /var/lib/docker/overlay2/e9wbsglitu04hcd1b42a9z4tc/diff
872764  /var/lib/docker/overlay2/p25vc9xkoofxoxizvlppdszpa/diff
872500  /var/lib/docker/overlay2/xjfx6i1omk60x321zb5546qie/diff
872300  /var/lib/docker/overlay2/jg82tg4ximgmi1wek3ghgmk81/diff
```

Note: this relies on `bash` globbing.

The `dust` way is: `dust /var/lib/docker/overlay2`

Using the folder name you can now use [jq](https://jqlang.github.io/jq/) and `docker inspect` to find the relevant container.

```
docker inspect $(docker container ls -q) | jq '.[] | select(.GraphDriver.Data | .. | objects | with_entries(select(.value | contains("4487fc7aca3c48d41b33d2abcde734cb9fd5906f6e84085da0e450a035f222b7"))) | select(. != {})) | .Name, .Id'
```

Slightly complex `jq` query as the folder name can be in any of the keys of `.GraphDriver.Data`. [This gist](https://gist.github.com/pedroxs/f0ee8c515eea0dbce2e23eea7c048e10) was the critical clue.

## Identify culprit data

Once we have the relevant container we can find out which folders where added or changed since container creation.

```
docker diff ijm-prod_journal_1 | grep '^A\|^C' | cut -f 2 -d " " | sort
```

At this point the culprit is hopefully obvious otherwise further spelunking inside the container with `du` is needed.

Or simply stop and remove the container before recreating it.
