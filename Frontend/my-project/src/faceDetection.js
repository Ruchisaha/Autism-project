import * as faceapi from 'face-api.js'

// Load face detection models
export async function loadFaceModels() {
  const MODEL_URL = '/models'
  
  try {
    console.log('🔄 Loading face detection models from:', MODEL_URL)
    
    const modelPromises = [
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
    ]

    console.log('🔄 Starting model loading...')
    await Promise.all(modelPromises)
    
    console.log('✅ All face detection models loaded successfully!')
    console.log('✅ TinyFaceDetector loaded:', faceapi.nets.tinyFaceDetector.isLoaded)
    console.log('✅ FaceLandmark68Net loaded:', faceapi.nets.faceLandmark68Net.isLoaded)
    console.log('✅ FaceRecognitionNet loaded:', faceapi.nets.faceRecognitionNet.isLoaded)
    console.log('✅ FaceExpressionNet loaded:', faceapi.nets.faceExpressionNet.isLoaded)
    
    return true
  } catch (error) {
    console.error('❌ Error loading face models:', error)
    console.error('❌ Model URL tried:', MODEL_URL)
    console.error('❌ Full error details:', error.message)
    return false
  }
}

// Detect emotions from image
export async function detectEmotionsFromImage(imageFile) {
  try {
    console.log('🔍 Starting emotion detection for image:', imageFile.name, imageFile.size, 'bytes')
    
    // Check if models are loaded first
    if (!areModelsLoaded()) {
      console.error('❌ Models not loaded yet!')
      throw new Error('Face detection models not loaded')
    }
    
    // Create image element
    const img = new Image()
    const imageUrl = URL.createObjectURL(imageFile)
    console.log('🖼️ Created image URL:', imageUrl)
    
    return new Promise((resolve, reject) => {
      img.onload = async () => {
        try {
          console.log('🖼️ Image loaded successfully, size:', img.width, 'x', img.height)
          
          // Detect face with expressions
          console.log('🔍 Starting face detection...')
          const detections = await faceapi
            .detectAllFaces(img, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceExpressions()
          
          console.log('🔍 Detection results:', detections.length, 'faces found')
          
          // Clean up
          URL.revokeObjectURL(imageUrl)
          
          if (detections && detections.length > 0) {
            const expressions = detections[0].expressions
            console.log('😊 Raw emotions detected:', expressions)
            
            // Convert to our format
            const emotions = {
              happiness: expressions.happy || 0,
              sadness: expressions.sad || 0,
              anger: expressions.angry || 0,
              fear: expressions.fearful || 0,
              surprise: expressions.surprised || 0,
              neutral: expressions.neutral || 0,
              disgust: expressions.disgusted || 0,
              contempt: 0 // face-api.js doesn't have contempt, set to 0
            }
            
            resolve(emotions)
          } else {
            console.log('No faces detected in image')
            resolve(null)
          }
        } catch (error) {
          console.error('Error in face detection:', error)
          reject(error)
        }
      }
      
      img.onerror = () => {
        URL.revokeObjectURL(imageUrl)
        reject(new Error('Failed to load image'))
      }
      
      img.src = imageUrl
    })
  } catch (error) {
    console.error('Error in emotion detection:', error)
    throw error
  }
}

// Check if models are loaded
export function areModelsLoaded() {
  return faceapi.nets.tinyFaceDetector.isLoaded &&
         faceapi.nets.faceLandmark68Net.isLoaded &&
         faceapi.nets.faceRecognitionNet.isLoaded &&
         faceapi.nets.faceExpressionNet.isLoaded
}