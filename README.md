# AGSBS Atom Package
[![Build status](https://travis-ci.org/TUD-INF-IAI-MCI/agsbs_atom_package.svg?branch=master)](https://travis-ci.org/TUD-INF-IAI-MCI/agsbs_atom_package?branch=master)

Requirements for Installation of this package
---------------------------------------------

The following instruction is copied from [nodejs/node-gyp](https://github.com/nodejs/node-gyp#installation)

You can install with `npm`:

``` bash
$ npm install -g node-gyp
```

You will also need to install:

  * On Unix:
    * `python` (`v2.7` recommended, `v3.x.x` is __*not*__ supported)
    * `make`
    * A proper C/C++ compiler toolchain, like [GCC](https://gcc.gnu.org)
  * On Mac OS X:
    * `python` (`v2.7` recommended, `v3.x.x` is __*not*__ supported) (already installed on Mac OS X)
    * [Xcode](https://developer.apple.com/xcode/download/)
      * You also need to install the `Command Line Tools` via Xcode. You can find this under the menu `Xcode -> Preferences -> Downloads`
      * This step will install `gcc` and the related toolchain containing `make`
  * On Windows:
    * Option 1: Install all the required tools and configurations using Microsoft's [windows-build-tools](https://github.com/felixrieseberg/windows-build-tools) using `npm install --global --production windows-build-tools` from an elevated PowerShell or CMD.exe (run as Administrator).
    * Option 2: Install tools and configuration manually:
      * Visual C++ Build Environment:
        * Option 1: Install [Visual C++ Build Tools](http://landinghub.visualstudio.com/visual-cpp-build-tools) using the **Default Install** option.

        * Option 2: Install [Visual Studio 2015](https://www.visualstudio.com/products/visual-studio-community-vs) (or modify an existing installation) and select *Common Tools for Visual C++* during setup. This also works with the free Community and Express for Desktop editions.

        > :bulb: [Windows Vista / 7 only] requires [.NET Framework 4.5.1](http://www.microsoft.com/en-us/download/details.aspx?id=40773)

      * Install [Python 2.7](https://www.python.org/downloads/) (`v3.x.x` is not supported), and run `npm config set python python2.7` (or see below for further instructions on specifying the proper Python version and path.)
      * Launch cmd, `npm config set msvs_version 2015`

    If the above steps didn't work for you, please visit [Microsoft's Node.js Guidelines for Windows](https://github.com/Microsoft/nodejs-guidelines/blob/master/windows-environment.md#compiling-native-addon-modules) for additional tips.

If you have multiple Python versions installed, you can identify which Python
version `node-gyp` uses by setting the '--python' variable:

``` bash
$ node-gyp --python /path/to/python2.7
```

If `node-gyp` is called by way of `npm` *and* you have multiple versions of
Python installed, then you can set `npm`'s 'python' config key to the appropriate
value:

``` bash
$ npm config set python /path/to/executable/python2.7
```

Note that OS X is just a flavour of Unix and so needs `python`, `make`, and C/C++.
An easy way to obtain these is to install XCode from Apple,
and then use it to install the command line tools (under Preferences -> Downloads).


## About this package

This package is developed to make the transcription process more effective.
At the moment the package is available as a Beta Version for testing.
There are a few open issues, please check [Open Issues](https://github.com/TUD-INF-IAI-MCI/agsbs_atom_package/issues).

If you found a new issue. Describe how it occurs:

- Which view was opened?
- Did you use a shortcut or a icon?
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
