import Cocoa
import Vision

let srcURL = URL(fileURLWithPath: "/Users/ommprakashmohanty/Ommprakash_Portfolio/public/suit-portrait.jpg")
guard let image = NSImage(contentsOf: srcURL),
      let cgImage = image.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
    print("Failed to load image")
    exit(1)
}

let request = VNGeneratePersonSegmentationRequest()
request.qualityLevel = .accurate
request.outputPixelFormat = kCVPixelFormatType_OneComponent8

let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
try handler.perform([request])

guard let result = request.results?.first else {
    print("Failed to get mask")
    exit(1)
}

let maskBuffer = result.pixelBuffer
let ciMask = CIImage(cvPixelBuffer: maskBuffer)
let ciImage = CIImage(cgImage: cgImage)

// Scale mask to original image size
let scaleX = CGFloat(cgImage.width) / ciMask.extent.width
let scaleY = CGFloat(cgImage.height) / ciMask.extent.height
let scaledMask = ciMask.transformed(by: CGAffineTransform(scaleX: scaleX, y: scaleY))

// Apply blend with mask
let filter = CIFilter(name: "CIBlendWithMask")!
filter.setValue(ciImage, forKey: kCIInputImageKey)
filter.setValue(CIImage.empty(), forKey: kCIInputBackgroundImageKey)
filter.setValue(scaledMask, forKey: kCIInputMaskImageKey)

guard let outputCI = filter.outputImage else {
    print("Failed to blend")
    exit(1)
}

let context = CIContext()
guard let outputCG = context.createCGImage(outputCI, from: outputCI.extent) else {
    print("Failed to render CGImage")
    exit(1)
}

let rep = NSBitmapImageRep(cgImage: outputCG)
guard let pngData = rep.representation(using: .png, properties: [:]) else {
    print("Failed to encode PNG")
    exit(1)
}

let outURL = URL(fileURLWithPath: "/Users/ommprakashmohanty/Ommprakash_Portfolio/public/suit-cutout.png")
try pngData.write(to: outURL)
print("SUCCESS: Apple Vision Person Segmentation generated perfect transparent cutout!")
