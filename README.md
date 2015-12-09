# story-solitaire

## Introduction
This is a prototype ui of our story solitaire project.

## Develop

I use `require.js` for developing. So goto `index.html`, and change the config of `require.js`:

```html
<script>
    // Release
    // var rconfig = {
    //     paths: {
    //         "main": "scripts/mainout"
    //     }
    // }
    // Develop
    var rconfig = {
        baseUrl: 'data',
    }
    require.config(rconfig);
    require(["main"]);
</script>
```

## Release

I use `r.js` to optimize requirejs's module, run following command:

```shell
$ cd path/to/repo/
$ r.js -o build.js
```

You can get optimized file `mainout.js` in `./scripts/mainout.js`

And into `index.html` to check if all goes well:

```html
<script>
    // Release
    var rconfig = {
        paths: {
            "main": "scripts/mainout"
        }
    }
    // Develop
    // var rconfig = {
    //     baseUrl: 'data',
    // }
    require.config(rconfig);
    require(["main"]);
</script>
```