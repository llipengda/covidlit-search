# CovidLit Search (Frontend)

## :book: Description

This is the frontend of the CovidLit Search project. It is a web application that allows users to search for scientific articles related to COVID-19. The articles are retrieved from the [COVID-19 Open Research Dataset (CORD-19)](https://www.kaggle.com/datasets/allen-institute-for-ai/CORD-19-research-challenge). The frontend is built using [React](https://reactjs.org/) and [Material-UI](https://material-ui.com/).

We have deployed the frontend on [Vercel](https://vercel.com/). You can access the deployed version [here](https://covidlit-search.vercel.app/) or [here](https://covidlit-search.pdli.site).

## :rocket: Getting Started

### Using Vercel

1. Fork this repository.
2. Go to the [Vercel website](https://vercel.com/).
3. Click on the "Import Project" button.
4. Select the forked repository.
5. Configure the project settings.
   - **Environment Variables**: You can set the environment variables in the Vercel dashboard. This following environment variable is **required**:
     - `SERVER_URL`: The URL of the backend API.
6. Click on the "Deploy" button.
7. Enjoy

### Using Local Development

1. Clone this repository.

```bash
git clone https://github.com/llipengda/covidlit-search.git
```

2. Install the dependencies.

```bash
cd covidlit-search
pnpm install
```

3. Set the environment variable.

```bash
export SERVER_URL=https://your-backend-api-url
```

4. Start the development server.

```bash
pnpm run dev
```

## :link: Links

- [Backend Repository](https://github.com/llipengda/covidlit-search-backend)
- [Vercel Deployment](https://covidlit-search.vercel.app/)
- [Custom Domain Deployment](https://covidlit-search.pdli.site/)
- [CORD-19 Dataset](https://www.kaggle.com/datasets/allen-institute-for-ai/CORD-19-research-challenge)
