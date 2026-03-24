import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

const MODELS_DIR = join(process.cwd(), 'public', 'models')
const BASE_URL = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights'

const MODEL_FILES = [
  'tiny_face_detector_model-shard1',
  'tiny_face_detector_model-weights_manifest.json',
  'face_landmark_68_model-shard1',
  'face_landmark_68_model-weights_manifest.json',
]

async function downloadModels() {
  await mkdir(MODELS_DIR, { recursive: true })

  for (const file of MODEL_FILES) {
    console.log(`Downloading ${file}...`)
    try {
      const response = await fetch(`${BASE_URL}/${file}`)
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      const buffer = Buffer.from(await response.arrayBuffer())
      await writeFile(`${MODELS_DIR}/${file}`, buffer)
      console.log(`  Done: ${file}`)
    } catch (err) {
      console.error(`  Failed to download ${file}:`, err.message)
    }
  }

  console.log('All models downloaded!')
}

downloadModels()
