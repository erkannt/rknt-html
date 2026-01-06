#!/usr/bin/env bash
set -euo pipefail

# Iterate over all markdown files in content/post
for md_file in $(find content/post -type f -name '*.md'); do
  [ -e "$md_file" ] || continue

  # Get the creation date (first commit) and the last updated date (most recent commit)
  created=$(git log --diff-filter=A --format=%aI -- "$md_file" | tail -n1 || true)
  updated=$(git log -1 --format=%aI -- "$md_file" || true)

  # Fallback to filesystem timestamps if git information is unavailable
  if [ -z "$created" ]; then
    created=$(date -r "$md_file" +"%Y-%m-%dT%H:%M:%S%z")
  fi
  if [ -z "$updated" ]; then
    updated=$(date -r "$md_file" +"%Y-%m-%dT%H:%M:%S%z")
  fi

  # If the file already contains a front‑matter block, insert (or replace) the dates right after the opening ---
  if grep -q '^---' "$md_file"; then
    awk -v d="date: $created" -v u="updated: $updated" '
      BEGIN {added=0}
      $0 == "---" && !added {
        print;                 # print the opening delimiter
        print d;               # insert creation date
        print u;               # insert updated date
        added=1;
        next
      }
      {print}
    ' "$md_file" > "${md_file}.tmp"
  else
    # No front‑matter block – create one at the top of the file
    {
      echo "---"
      echo "date: $created"
      echo "updated: $updated"
      echo "---"
      cat "$md_file"
    } > "${md_file}.tmp"
  fi

  # Replace the original file with the updated version
  mv "${md_file}.tmp" "$md_file"
done
