---
date: 2023-04-29T15:59:10+01:00
updated: 2023-04-29T15:59:10+01:00
title: How to add bevels to STLs
---

{{ pic(path="./cover.png") }}

This is the workflow I've found for adding chamfers and fillets to existing STL files.

Why?:

- Solvespace and OpenSCAD can't do chamfers or fillets
- The mesh of an STL might not let Blender easily make bevels


## Remeshing with Blender

{{ pic(path="./remesh-workflow.png") }}

1. Import the STL in Blender
2. Apply _Remesh > Sharp_ modifier
   - increase octree depth until shape is healthy
   - _Apply_
3. Apply _Decimate > Collapse_ modifier
   - this will make the next step less computationally expensive
   - _Apply_
4. Apply _Decimate > Planar_ modifier
   - this should get us most of the way to a bevel friendly mesh
   - _Apply_

## Tidying up

{{ pic(path="./merge-dodgy-edges.png") }}

To tidy up squiggly edges:

1. Enter _Edit_ mode (Tab-key)
1. Use vertex selection (1-key)
2. Select vertices
3. Merge them (M-key)

## Making bevels easier with MESHmachine

{{ pic(path="./unfuck.png") }}

For chamfers and fillets [MESHmachine](https://machin3.gumroad.com/l/MESHmachine) is a godsend and well worth the 40$.

- selecting relevant edges is dead easy thanks to _LSelect_
- _Unf*ck_ helps resolve dodgy Blender bevels

