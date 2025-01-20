# Optimager

This is a small utility to optimaze images into webp format, for projects using AstroJS with React.
As you cannot use astro's `<Image />` component inside React. This utility can be used before every build for dev or prod in order to optimize images.


## Config

Make a config file `optimager.config.json` in your root project folder:

You can specify, in order, a list of folders to include.

```json
{
    "inputFolders": ["src/content/privImages", "src/content/pubImages"],
    "outputFolders": ["public/privImages", "public/pubImages"]
}
```

## Change your run scripts

Insert optimager before the rest of commands:


```json
"scripts": {
    "dev": "optimager && astro dev"
  }
```
