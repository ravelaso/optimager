# Optimager

This is a small utility to optimaze images into webp format, for projects using AstroJS with React.
As you cannot use astro's `<Image />` component inside React. This utility can be used before every build for dev or prod in order to optimize images.

You can use it once a time to just convert all your images from one folder to the src folder or everytime you build or dev your project.

See examples below:


## Auto (Convert everytime)

1. Config

Make a config file `optimager.config.json` in your root project folder:

You can specify, in order, a list of folders to include.

```json
{
    "inputFolders": ["src/content/images", "src/content/images2"],
    "outputFolders": ["public/images", "src/assets/images2"],
    "cleanInput": "false", // This will leave the un-optimized images intact in their folder. 
    "cleanOutput": "true" // This will clean the output folder before converting again the images on every build.
}
```

2. Change your run scripts

Insert optimager before the rest of commands:

```json
"scripts": {
    "dev": "optimager && astro dev"
  }
```

You can also run optimager to just convert your images from an input folder where you can drop all the images that will be converted to webp into your ``src`` folder for example. 

Make sure you reference the files now from your output folders, so that everytime you run or dev your project, you will use the optimized images.



## Manual (One Time)

If you need to just convert a bunch of images everynow and then:


1. Set your config:

We will use a root project folder ``inputImages``, and we will conver them into ``src/assets/images``.

When setting ``cleanInput`` to true, we will delete all images after conversion and setting ``cleanOutput`` to false, ensures all the old images in the src folder will remain intact.

```json

// optimager.config.json

{
    "inputFolders": ["inputImages"],
    "outputFolders": ["src/assets/images"],
    "cleanInput": "true",
    "cleanOutput": "false"
}
```


2. Convert Images 

We can drop our new images in the ``inputImages`` folder and then run:

```sh
npx optimager
```

Now you can reference the images from your src folder and they will be in webp format.
