# Bundler regression

The file [bun-1.1.20-server-bundle.js](./built_bundle/bun-1.1.20-server-bundle.js) was built with bun `1.1.20` using the `bun run dev` script.
The file [bun-1.1.22-server-bundle.js](./built_bundle/bun-1.1.22-server-bundle.js) was built with bun `1.1.22` using the `bun run dev` script.

Bun `1.1.22` causes the following error:
```
4017 | var init_fragments = __esm(() => {
4018 |   init_esm2();
4019 |   init_dist3();
4020 | });
4021 | 
4022 | var Container, ImageContainer = styled.div`
                                                 ^
TypeError: undefined is not a function (near '...styled.div`
  height: 60svh;
  padding: 2rem 0;
`...')
      at /home/jdb/Documents/projects/bun/bundler-regression/build/server/index.js:4022:43
```