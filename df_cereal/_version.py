# Copyright (c) Paddy Mullen.
# Distributed under the terms of the Modified BSD License.

try:
    import pkg_resources
    __version__ = pkg_resources.get_distribution('df_cereal').version
except Exception:
    import os
    import json
    package_path = os.path.join(
        os.path.dirname(__file__),
        "../package.json")   
    __version__ = json.loads(open(package_path).read())['version']

