# AGSBS Atom Package
[![Build status](https://travis-ci.org/TUD-INF-IAI-MCI/agsbs_atom_package.svg?branch=master)](https://travis-ci.org/TUD-INF-IAI-MCI/agsbs_atom_package?branch=master)

This package is developed to make the transcription process more effective.
At the moment the package is available as a Beta Version for testing.
There are a few open issues, please check [Open Issues](https://github.com/TUD-INF-IAI-MCI/agsbs_atom_package/issues).

If you found a new issue. Describe how it occurs:

- Which view was opened?
- Did you use a shortcut oder a icon?
- Was a error message shown?

Also an screenshot is very helpful.



## What is AGSBS?

AGSBS (Arbeitsgruppe Studium für Blinde und Sehbehinderte eng. working group for blind and visually impaired Students) is a working group of TU Dresden (germany). AGSBS works on (automatically) transcribing study material to offer it to the blind an visually impaired students.

## What does this package?
It is a GUI toolkit which helps to transcribe study material to markdown which fulfill the AGSBS guidelines.

## Installation
It is necessary to install [https://github.com/TUD-INF-IAI-MCI/AGSBS-infrastructure/tree/master/MAGSBS](matuc).

## Configuration
In the settings you can set up whether you want to use git.
Also the installation path of matuc can be set, if the installation path **is not** C:\\Program Files (x86)\\agsbs\\matuc, you have to change the default entry.

## Functions
- simple git functions, like clone, pull and push are supported
- GUI for adding a commit message
- GUI for the creation of different markdown table
  - grid table
  - pipe table
  - simple table
- import data from a csv file as a pipe table
- GUI for adding a image and add alternative text
- Formatting the markdown by various icons
- generation of HTML by using [https://github.com/TUD-INF-IAI-MCI/AGSBS-infrastructure/tree/master/MAGSBS](matuc) (Markdown TU Dresden Converter)
- GUI for adding Links
- preview for Markdown
