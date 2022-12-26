import React, { useState, useEffect } from 'react'
import { takePicture, requestPermissions } from 'react-native-camera'
import Tesseract from 'react-native-tesseract-ocr'

const extractTextFromImage = async (path: string): Promise<string> => {
  try {
    const { data } = await Tesseract.recognize(path, 'LANG_ENGLISH')
    return data
  } catch (err) {
    console.error(err)
  }
}

interface UseCameraAndOcrResult {
  text: string
  error?: string | null
}

const useCameraAndOcr = (): UseCameraAndOcrResult => {
  const [text, setText] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {}, [])

  const requestCameraPermission = async () => {
    try {
      const granted = await requestPermissions()
      if (granted === true || granted === 'granted') {
        await takePictureAndExtractText()
      } else {
        setError('camera permission denied')
      }
    } catch (err) {
      // @ts-ignore
      setError(err.message)
    }
  }

  const takePictureAndExtractText = async () => {
    try {
      const path = await takePicture()
      const extractedText = await extractTextFromImage(path)
      setText(extractedText)
    } catch (err) {
      setError('error while taking picture')
    }
  }

  useEffect(() => {
    requestCameraPermission()
  }, [])

  return {
    text,
    error
  }
}

export default useCameraAndOcr
