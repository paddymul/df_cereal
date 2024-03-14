# DF_Cereal - Serialization testing ground

This is a stripped down repo to test different methods of dataframe serialization.  It aims to be a referencer implementation for serializing dataframes with pyarrow.

## notes

This repo is built on top of stripped down [buckaroo](https://github.com/paddymul/buckaroo) repo.  Some buckaroo artifacts might pop out here and there.
## Development installation

For a development installation:

```bash
git clone https://github.com/paddymul/df_cereal.git
cd df_cereal
#we need to build against 3.6.5, jupyterlab 4.0 has different JS typing that conflicts
# the installable still works in JL4
pip install build twine pytest sphinx polars mypy jupyterlab==3.6.5 pandas-stubs
pip install -ve .
```

Enabling development install for Jupyter notebook:


Enabling development install for JupyterLab:

```bash
jupyter labextension develop . --overwrite
```

Note for developers: the `--symlink` argument on Linux or OS X allows one to modify the JavaScript code in-place. This feature is not available with Windows.
`
### Developing the JS side

There are a series of examples of the components in [examples/ex](./examples/ex).



Instructions
```bash
npm install
npm run dev
```


## Contributions

We :heart: contributions.

Have you had a good experience with this project? Why not share some love and contribute code, or just let us know about any issues you had with it?

We welcome issue reports [here](../../issues); be sure to choose the proper issue template for your issue, so that we can be sure you're providing the necessary information.

