Next.js recommends using the app directory to define application routes.
It expects files within the app directory to correspond to specific routes.

!! However, this routing mechanism does not align with the FSD (Feature-Sliced Design) concept !!

To address this, we moved the Next.js app directory to the root of the project and imported
FSD pages from src—where the FSD layers are located—into the app directory.

Additionally, we had to add a pages folder to the root of the project. Otherwise,
Next.js would try to use src/pages as the Pages Router even when we are using the App Router,
which would cause build errors.
