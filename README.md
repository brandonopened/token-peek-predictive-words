# Token Probability Visualizer

A React-based web application that simulates and visualizes how Large Language Models (LLMs) work at the token level. This tool demonstrates the concept of token probability scoring and alternative token generation that occurs during text generation.

## What This Tool Does

This application **simulates** the internal workings of LLMs by:

- **Token Probability Visualization**: Shows how each word/token in generated text might be scored for confidence
- **Alternative Token Generation**: Demonstrates how LLMs consider multiple possible tokens at each position
- **Interactive Exploration**: Allows users to hover over tokens to see simulated alternatives and their confidence scores

## Important Note: This is a Simulation

⚠️ **This tool does NOT show actual token-level data from LLMs.** 

Current LLM APIs (including OpenAI and Ollama) do not provide access to:
- Individual token probabilities
- Alternative token candidates
- Internal confidence scores

Instead, this tool **simulates** these concepts to help users understand how LLMs work internally. The probability scores and alternatives are generated algorithmically to demonstrate the concept.

## Features

- **Dual LLM Support**: Connect to either Ollama (local) or OpenAI (cloud)
- **Interactive Token Display**: Hover over tokens to see simulated alternatives
- **Confidence Scoring**: Color-coded tokens based on simulated confidence levels
- **Real Text Generation**: Uses actual LLM APIs to generate text, then simulates token analysis
- **Responsive Design**: Works on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Ollama (for local LLM usage) - see setup instructions below

### Installation

```sh
# Clone the repository
git clone <YOUR_REPO_URL>
cd token-peek-predictive-words

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:8080`

## Setting Up Ollama (Local LLM)

### Download and Install Ollama

1. **Visit the official Ollama website**: https://ollama.ai
2. **Download Ollama** for your operating system:
   - **macOS**: Download the `.dmg` file and drag to Applications
   - **Windows**: Download the `.exe` installer
   - **Linux**: Run the installation script from the website

3. **Install and launch Ollama**:
   - On macOS: Open Ollama from Applications
   - On Windows: Run the installer and launch from Start Menu
   - On Linux: Follow the terminal installation instructions

### Download a Model

After installing Ollama, you need to download a model. The app is configured to use `llama3.2:latest`:

```sh
# Open terminal/command prompt and run:
ollama pull llama3.2:latest
```

**Alternative models you can try**:
```sh
ollama pull llama3.1:latest          # Llama 3.1 (smaller, faster)
ollama pull llama2:latest            # Llama 2 (older but stable)
ollama pull mistral:latest           # Mistral 7B (good performance)
ollama pull codellama:latest         # Code-focused model
```

### Verify Ollama is Running

1. **Check if Ollama is running**:
   ```sh
   curl http://localhost:11434/api/tags
   ```
   This should return a JSON response with your available models.

2. **Test the model**:
   ```sh
   ollama run llama3.2:latest "Hello, how are you?"
   ```

### Using the App with Ollama

1. **Start the web application** (if not already running):
   ```sh
   npm run dev
   ```

2. **Open your browser** and go to `http://localhost:8080`

3. **Select "Ollama (Local)"** from the provider dropdown

4. **Enter the Ollama URL** (default: `http://localhost:11434`)

5. **Enter your prompt** and click "Generate Text"

6. **Hover over tokens** to see simulated alternatives and confidence scores

### Troubleshooting Ollama

**If Ollama won't start**:
- Check if it's already running: `ps aux | grep ollama` (macOS/Linux)
- Restart Ollama from the Applications folder (macOS)
- Check system requirements (8GB+ RAM recommended)

**If the model isn't found**:
- Verify the model is downloaded: `ollama list`
- Re-download the model: `ollama pull llama3.2:latest`

**If the API call fails**:
- Check if Ollama is running on port 11434
- Try restarting Ollama
- Check firewall settings

## Usage

### Using Ollama (Local)

1. Select "Ollama (Local)" from the provider dropdown
2. Enter your Ollama server URL (default: `http://localhost:11434`)
3. Make sure you have Ollama running with the `llama3.2:latest` model
4. Enter your prompt and click "Generate Text"

### Using OpenAI (Cloud)

1. Select "OpenAI (Cloud)" from the provider dropdown
2. Enter your OpenAI API key (stored locally, never sent to our servers)
3. Enter your prompt and click "Generate Text"

### Exploring Token Probabilities

After generating text:
- Hover over any token to see simulated confidence scores
- View alternative tokens that the simulation suggests
- See color-coded confidence levels (Excellent, High, Moderate, Fair, Strong)

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **LLM Integration**: OpenAI API and Ollama API

## Development

### Available Scripts

```sh
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Project Structure

```
src/
├── components/
│   ├── LLMInterface.tsx    # Main interface component
│   ├── TokenDisplay.tsx    # Token visualization component
│   └── ui/                 # shadcn/ui components
├── pages/
│   ├── Index.tsx           # Main page
│   └── NotFound.tsx        # 404 page
└── hooks/                  # Custom React hooks
```

## Understanding the Simulation

### Token Probability Colors

- **Excellent (≥80%)**: Green - High confidence tokens
- **High (60-80%)**: Light green - Good confidence
- **Moderate (40-60%)**: Yellow - Medium confidence
- **Fair (20-40%)**: Orange - Lower confidence
- **Strong (<20%)**: Red - Very low confidence

### How the Simulation Works

1. **Text Generation**: Uses real LLM APIs to generate text
2. **Token Splitting**: Breaks the response into individual tokens/words
3. **Probability Simulation**: Generates realistic probability scores based on word frequency and context
4. **Alternative Generation**: Creates plausible alternative tokens for each position
5. **Visualization**: Displays the results with interactive hover effects

## Contributing

This is an educational tool designed to help people understand LLM internals. Contributions that improve the simulation accuracy or educational value are welcome!

## License

This project is open source and available under the MIT License.
