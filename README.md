# ImageStory AI — Bilingual Image-to-Story Generator

> A web application that turns an uploaded image into a short creative story in **English and Urdu** using Google's Gemini multimodal generative AI model.

ImageStory AI is a small, interactive AI application built with React and TypeScript. A user selects an image, previews it, and asks Gemini to write a story inspired by the image. The application requests a structured JSON response containing separate English and Urdu stories, then displays the result in a language-switching interface.

This repository demonstrates the integration of a multimodal generative AI API into a browser-based application. It is **not** a model-training or image-classification project: the app calls a pretrained Gemini model through the Google GenAI SDK.

## Contents

- [Features](#features)
- [Demo and screenshots](#demo-and-screenshots)
- [How it works](#how-it-works)
- [Model and prompting strategy](#model-and-prompting-strategy)
- [Technology stack](#technology-stack)
- [Project structure](#project-structure)
- [Run locally](#run-locally)
- [Configuration and API-key security](#configuration-and-api-key-security)
- [Build for production](#build-for-production)
- [Limitations and responsible use](#limitations-and-responsible-use)
- [Future improvements](#future-improvements)
- [Learning outcomes](#learning-outcomes)
- [Acknowledgements and attribution](#acknowledgements-and-attribution)
- [License](#license)

## Features

- **Image upload:** Choose an image from the device or drag and drop it into the upload area.
- **Image preview:** Preview the selected image before requesting a story.
- **Multimodal generation:** Send image content and a text instruction to Gemini in one request.
- **Bilingual stories:** Request both English and Urdu versions of the story.
- **Structured output:** Ask the model for JSON with `english` and `urdu` string fields.
- **Language switching:** View either language in the results panel; Urdu text is displayed right-to-left.
- **Loading and error states:** Show progress while a request is running and display a user-facing message if generation fails.
- **Start over:** Clear the current result and choose another image.

## Demo and screenshots

A live demo is not included in this repository. Add a link here only after deploying and testing a public instance.

To make the repository easier to review, add a screenshot of the **actual running application** to a `screenshots/` directory and embed it here, for example:

```markdown
![ImageStory AI interface](screenshots/app-preview.png)
```

Do not use a mockup as evidence of a working feature; capture the application after testing it.

## How it works

The application follows this sequence:

1. **Select an image.** The `ImageUploader` component lets the user choose a supported image file or drag and drop it.
2. **Preview the image.** The app creates a temporary browser object URL for the preview.
3. **Prepare image data.** `utils/imageUtils.ts` reads the selected file and extracts its Base64-encoded content.
4. **Build the AI request.** `services/geminiService.ts` combines the image data and a text prompt in a multimodal request.
5. **Generate structured output.** Gemini is asked to produce a short story in English and Urdu using a JSON response schema.
6. **Validate and parse the response.** The service parses the returned JSON and checks that both language fields exist.
7. **Display the result.** `StoryDisplay` presents the story and allows the user to switch between English and Urdu or start again.

### Architecture at a glance

```text
User
  |
  v
React UI (App.tsx + components/)
  |
  +--> Image preview and local file handling
  |
  v
utils/imageUtils.ts
  |  Base64 image data
  v
services/geminiService.ts
  |  Image + prompt + JSON response schema
  v
Google Gemini 2.5 Flash API
  |
  |  { "english": "...", "urdu": "..." }
  v
Parse and validate response
  |
  v
StoryDisplay: English / اردو
```

## Model and prompting strategy

### Model used

The current implementation calls **`gemini-2.5-flash`** through the `@google/genai` SDK. This is a pretrained multimodal generative model; the project does not fine-tune or train the model.

### Input

The request contains two parts:

- The uploaded image, sent as inline image data with its MIME type.
- A text instruction asking the model to write an imaginative story inspired by the image.

### Prompting and response format

The current prompt asks for a short, creative story of approximately **100–150 words** and requests both English and Urdu. The API request also specifies a JSON response schema with two required string properties:

- `english`: the English story.
- `urdu`: the Urdu story.

Using a defined response shape makes the frontend easier to implement than relying on free-form text with both languages mixed together. The service parses the JSON and checks that both fields are present before returning the result to the UI.

### Important interpretation

The model generates a creative story based on its interpretation of the image. It is not guaranteed to identify every object correctly, and the story may include invented characters or events. The generated content should be treated as creative writing, not as a verified caption or factual description.

## Technology stack

| Technology | Role in this project |
|---|---|
| React 19 | Builds the interactive, component-based interface |
| TypeScript | Adds static types to application code |
| Vite 6 | Runs the local development server and builds the frontend |
| `@google/genai` | Google GenAI SDK used to call Gemini |
| Gemini 2.5 Flash | Pretrained multimodal model used for story generation |
| Tailwind CSS (CDN) | Utility classes used for styling in the HTML page |

The exact package versions and dependency ranges are recorded in `package.json` and `package-lock.json`.

## Project structure

```text
imagestory-ai/
├── components/
│   ├── CloudRunDeploy.tsx
│   ├── Header.tsx
│   ├── ImageUploader.tsx
│   ├── Loader.tsx
│   └── StoryDisplay.tsx
├── services/
│   └── geminiService.ts
├── utils/
│   └── imageUtils.ts
├── App.tsx
├── index.html
├── index.tsx
├── index.css
├── metadata.json
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
├── .env.example
├── .gitignore
└── README.md
```

> `CloudRunDeploy.tsx` is included in the source tree, but the current `App.tsx` does not render that component. Do not describe an in-app deployment button as an active feature unless you wire it into the UI and test it.

## Run locally

### Prerequisites

- Node.js (use a currently supported LTS release)
- npm
- A Google Gemini API key with access to the selected model

### 1. Clone the repository

Replace the placeholder URL with the URL of your own GitHub repository.

```bash
git clone <YOUR-REPOSITORY-URL>
cd imagestory-ai
```

If you named your local folder differently, change the `cd` command accordingly.

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the API key

Create a local file named `.env.local` in the project root. Use `.env.example` as a reference and add your own key:

```dotenv
GEMINI_API_KEY=your_gemini_api_key_here
```

Do not include quotation marks unless required by your environment. Replace the placeholder with your own key locally; **never commit the real key**.

### 4. Start the development server

```bash
npm run dev
```

Open the local address printed in the terminal by Vite.

### 5. Generate a story

1. Select a PNG, JPEG, GIF, or WebP image.
2. Check the image preview.
3. Select **Generate Story**.
4. Wait for the model response.
5. Switch between English and Urdu.
6. Select **Start Over with a New Image** to try another image.

The uploader text mentions a 10 MB limit, but the current source code does not enforce that size limit. Treat the stated limit as guidance until explicit file-size validation is implemented.

## Configuration and API-key security

The current `vite.config.ts` reads `GEMINI_API_KEY` and substitutes it into the frontend as `process.env.API_KEY`. **This means the key can become visible in the browser bundle and to users of a deployed frontend.** A `.gitignore` entry prevents accidental commits but does not make a client-side key safe.

For a local learning exercise, use a restricted key, apply any available provider-side restrictions and usage limits, and never commit the key. Before public deployment, the recommended architecture is:

1. Keep the Gemini API key in server-side environment configuration or a secret manager.
2. Send the image and request from the frontend to your own backend endpoint.
3. Have the backend call Gemini and return only the generated story to the browser.
4. Apply input validation, file-size limits, rate limiting, and error handling on the server.

If a real key has ever been committed to a public repository or otherwise exposed, revoke it and create a new one. Removing the key in a later commit does not erase it from Git history.

## Build for production

Create an optimized build:

```bash
npm run build
```

Preview the generated build locally:

```bash
npm run preview
```

A successful frontend build does not prove that Gemini requests will work in production. Test the full image-to-story flow in the intended deployment environment, and address the client-side API-key exposure before making a public deployment.

## Limitations and responsible use

- **Creative output can be inaccurate:** The story may misinterpret an image or invent details.
- **No benchmark score:** This is a generative application, not a supervised classification experiment. Accuracy, precision, recall, F1-score, and confusion matrices are not applicable without defining a separate labelled evaluation task.
- **Internet and API access required:** Story generation depends on the Gemini service, an active API key, model availability, and applicable usage limits.
- **Cost and quotas:** API usage may incur charges or be subject to quotas according to the provider's current terms.
- **Input validation needs improvement:** The UI advertises a 10 MB limit, but the current code does not enforce it. Additional validation should be added for file size, file type, and malformed responses.
- **Privacy:** Avoid uploading confidential, personal, or sensitive images unless you understand the service's current data-handling terms and have permission to use the image.
- **API-key architecture:** The existing Vite configuration exposes the key to client-side code; use a backend before public deployment.

## Future improvements

1. **Move Gemini calls to a backend** so the API key is not shipped to the browser.
2. **Validate uploads** by enforcing MIME type and file-size limits before reading or sending an image.
3. **Improve resource cleanup** by revoking temporary object URLs when an image is replaced or the component is reset.
4. **Add automated tests** for image conversion, response parsing, error states, and UI interactions.
5. **Improve response validation** to handle missing text, invalid JSON, blocked responses, and API errors consistently.
6. **Add configurable prompts** for different story styles, target audiences, or lengths.
7. **Add deployment documentation** only after selecting and testing a secure deployment architecture.
8. **Add an evaluation plan** using a small, consented test set and human review for image relevance, story coherence, and Urdu fluency if evaluating output quality.

## Learning outcomes

This project provides practical experience with:

- Integrating a pretrained multimodal generative AI model into a web interface.
- Passing image data and text instructions in a single model request.
- Requesting structured JSON output and parsing it in TypeScript.
- Organizing a React application into reusable components and service utilities.
- Managing loading states, user-visible errors, and bilingual text rendering.
- Recognizing the difference between a working prototype and a securely deployable application.

Update this section to reflect the parts you personally implemented, tested, and learned. If you adapted a starter project, identify the source in the acknowledgements below.

## Acknowledgements and attribution

The original project README links to a Google AI Studio app and the source includes a Cloud Run deployment component pointing to Google's generative AI sample repository. If this repository was created by adapting that starter or any other external code, retain appropriate attribution and follow the original project's license and terms.

- Google AI Studio project referenced by the original README: <https://ai.studio/apps/drive/1rQmboyXu7WJeRc79DwWPUkjDpThMNH0t>
- Google Cloud generative AI sample repository referenced in the source: <https://github.com/GoogleCloudPlatform/generative-ai-docs-samples>

Review the original source and license before redistributing adapted code. The links above are included as attribution leads, not as a claim that this repository is an official Google product.

## License

No project-specific license was included in the supplied archive. Unless you add a license, other people do not automatically receive permission to reuse, modify, or redistribute your code. Choose a license after confirming the rights and attribution requirements for any starter code you used.
