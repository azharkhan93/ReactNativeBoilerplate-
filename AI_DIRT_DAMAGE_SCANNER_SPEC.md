# 🤖 AI Dirt & Paint Damage Scanner Technical Architecture Specification

## 1. Overview
The **AI Dirt & Paint Damage Scanner** allows users to capture 2–3 photos of their vehicle (front, side, wheels/problem areas) and receive instant, AI-driven vehicle condition diagnostics along with automated, personalized service package recommendations.

```
┌─────────────────┐      ┌─────────────────────────┐      ┌──────────────────────────┐
│  Mobile App     │      │   Backend API           │      │  Multimodal Vision LLM   │
│  (Camera/Upload)├─────►│  (Node.js / GraphQL /   ├─────►│  (Gemini 2.0 Flash /     │
│                 │      │   Firebase Function)    │      │   GPT-4o Vision)         │
└────────┬────────┘      └────────────┬────────────┘      └────────────┬─────────────┘
         │                            │                                │
         │◄───────────────────────────┴────────────────────────────────┘
         │  Structured JSON Response:
         │  • Detected Conditions (Heavy Mud, Swirl Marks, etc.)
         │  • Severity Scores (1-10)
         │  • Recommended Wash Package & Add-ons
```

---

## 2. Recommended Technology Stack & Libraries

### A. Mobile Client (React Native)
| Domain | Recommended Library / Tool | Purpose |
| :--- | :--- | :--- |
| **Camera & Media** | `react-native-image-picker` | High-resolution camera capture & photo library selection. |
| **Image Compression** | `react-native-compressor` or `react-native-image-resizer` | Compress and resize images client-side (under 1MB each) before API upload to optimize network bandwidth and LLM latency. |
| **UI & Animations** | `react-native-reanimated` | Scanner overlay target reticle animation, pulsing laser line, and smooth results sheet transitions. |
| **Icons & Design** | `lucide-react-native` + `NativeWind` | Minimal status icons (`Sparkles`, `ShieldAlert`, `CheckCircle2`) and Tailwind token styling. |

### B. AI & Multimodal LLM Stack
| Category | Recommended Model / Technology | Why This Stack? |
| :--- | :--- | :--- |
| **Primary Vision LLM** | **Google Gemini 2.0 Flash / Gemini 1.5 Pro** | **Top Choice**: Ultra-fast latency (~1-2 seconds), native structured JSON schema enforcement (`responseSchema`), and highly cost-effective image token processing. |
| **Alternative Vision LLM** | **OpenAI GPT-4o-mini / Claude 3.5 Sonnet** | Fallback multimodal vision provider for high-tier detail inspection. |
| **On-Device Pre-Filter (Optional)** | **YOLOv8-seg / CoreML / TFLite** | Optional edge model to detect if the photo is actually a car before sending it to the cloud API. |

### C. Backend & API Middleware
| Domain | Tooling | Role |
| :--- | :--- | :--- |
| **SDK** | `@google/genai` (Google Gen AI SDK) | Direct integration with Gemini API. |
| **Validation** | `zod` | Enforce strict TypeScript & JSON schema validation on the AI response. |
| **Backend Layer** | GraphQL Mutation / Firebase Cloud Functions | Secure serverless wrapper to execute AI calls without exposing API keys on the client. |

---

## 3. Data Schemas & AI JSON Output Structure

### A. TypeScript Interface
```typescript
export interface DetectedCondition {
  readonly id: string;
  readonly category: 'dirt' | 'paint' | 'wheels' | 'interior';
  readonly name: string; // e.g. "Heavy Swirl Marks", "Tree Sap", "Brake Dust"
  readonly severity: 'light' | 'moderate' | 'severe'; // 1-10 scale
  readonly confidenceScore: number; // 0.0 - 1.0
  readonly summary: string;
}

export interface RecommendedPackage {
  readonly packageId: string; // e.g. "ceramic_detail_pro", "foam_wash_basic"
  readonly title: string;
  readonly reason: string;
  readonly suggestedAddons: readonly string[]; // e.g. ["clay_bar", "tire_shine"]
}

export interface VehicleScanResult {
  readonly isVehicleDetected: boolean;
  readonly vehicleInfo?: {
    readonly estimatedType?: 'Sedan' | 'SUV' | 'Truck' | 'Coupe' | 'Hatchback';
    readonly colorCategory?: string;
  };
  readonly overallConditionScore: number; // 1 (Worst) to 10 (Pristine)
  readonly detectedConditions: readonly DetectedCondition[];
  readonly recommendedPackage: RecommendedPackage;
}
```

---

## 4. Prompt Engineering Blueprint (Gemini API)

```typescript
export const GEMINI_SYSTEM_PROMPT = `
You are an expert automotive detailing technician and paint inspection specialist.
Analyze the provided vehicle photo(s) and output a strict JSON object adhering to the specified schema:

1. Identify if a vehicle is visible in the photo(s).
2. Detect specific surface conditions:
   - Dirt level (Light Dust, Moderate Grime, Heavy Mud, Bugs/Tar, Tree Sap).
   - Paint flaws (Water Spots, Swirl Marks, Deep Scratches, Oxidation).
   - Wheel condition (Brake Dust buildup, Grime).
3. Assign an overall condition score from 1 (severely neglected) to 10 (showroom condition).
4. Recommend the exact service package (e.g. 'basic_wash', 'deluxe_detailing', 'ceramic_paint_restoration') and recommended add-on treatments.

Respond strictly in valid JSON format.
`;
```

---

## 5. End-to-End User Experience Workflow

```
[Tap "AI Scan My Car"] ──► [Take 2-3 Photos] ──► [Client Compression] ──► [Gemini Vision Analysis]
                                                                                   │
[1-Tap Book Recommended Package] ◄── [Display Diagnostics & Package Card] ◄──────┘
```

1. **Step 1: Scan Entrypoint**: User taps **"AI Condition Scanner"** on the Home or Booking screen.
2. **Step 2: Guided Capture**: Live camera reticle guides the user (*"Step 1: Take photo of front hood/paint"*, *"Step 2: Take photo of wheels/side"*).
3. **Step 3: Client Compression**: `react-native-compressor` resizes images to `1024x1024` jpeg @ 80% quality.
4. **Step 4: AI Analysis**: Sends images to backend wrapper calling `gemini-2.0-flash` with structured JSON schema output.
5. **Step 5: Instant Diagnostic Card**: Displays visual tags (e.g., `[🔴 Heavy Swirl Marks]`, `[🟡 Brake Dust]`) with a 1-tap **"Book Recommended Package"** CTA button.

---

## 6. Target Screen Modules & Integration Points

### A. Core Dedicated Module (`components/Customer/VehicleScanModal/`)
Create a modular component folder adhering to our architectural standard:
```
components/Customer/VehicleScanModal/
  ├── index.ts
  ├── VehicleScanModal.tsx    (Modal overlay with camera view & AI results sheet)
  ├── styles.ts              (NativeWind style tokens)
  ├── types.ts               (Interfaces for camera state & scan results)
  ├── hooks.ts               (Handles camera permissions, upload, & API state)
  └── components/
      ├── CameraOverlay/     (Pulsing scanning line & target reticle)
      └── AnalysisResultCard/ (Detected badges & recommended package CTA)
```

### B. Screen Integration Entrypoints

1. **HomeScreen (`screens/HomeScreen/HomeScreen.tsx`)**:
   * **Hero Action Banner**: Add a prominent card right below the top search bar:
     > 🤖 **"Not sure what service your car needs? Scan with AI in 10 seconds →"**
   * **Behavior**: Opens `VehicleScanModal`. Once completed, automatically filters `NearbyProviders` showing detailers offering the AI-recommended service package.

2. **VendorDetailScreen (`screens/VendorDetailScreen/VendorDetailScreen.tsx`)**:
   * **Package Selection Assistant**: Place an **"AI Wash Package Recommender"** banner at the top of the provider's package list.
   * **Behavior**: Auto-preselects the matching package (e.g., *Deluxe Ceramic Detailing*) and checks recommended add-on toggles (e.g., *Clay Bar Treatment*) based on the scan results.

---

## 7. Handling Edge Cases: Low Light, Blur, & Obstructed Photos

To ensure a reliable user experience even when users scan their vehicles in dark garages, at night, or with blurry cameras, we implement a **5-Layer Quality Guardrail Strategy**:

```
[Layer 1: Auto-Torch / Flash] ──► [Layer 2: On-Device Sharpness Check] ──► [Layer 3: Gemini Quality Schema]
                                                                                      │
                                  [Layer 5: Manual Questionnaire Fallback] ◄── [Layer 4: AI Rejection Toast]
```

### Layer 1: Hardware Auto-Torch & Guidance (Camera View)
* **Auto-Flash Toggle**: The camera UI detects ambient lux/brightness. In low light, the app displays a prominent **"Turn Flash ON 🔦"** button or auto-enables the torch mode.
* **Tap-to-Focus Reticle**: Provides visual target boundaries with text guidance: *"Hold steady & ensure bright lighting for best paint inspection"*.

### Layer 2: On-Device Pre-Check (Instant Client Validation)
* **Fast Brightness & Blur Check**: Before sending the photo to the cloud API, the mobile app performs an instant image histogram check.
* **Immediate Retake Alert**: If the image is pitch black (average pixel value < 15%) or severely out-of-focus, the app alerts the user immediately:
  > ⚠️ *"Photo is too dark. Please turn on your flash or step into a well-lit area."*

### Layer 3: Gemini Prompt Rejection & Quality Schema
In the system prompt, Gemini Vision evaluates image clarity and returns a structured status:

```typescript
export interface AIQualityCheckResponse {
  readonly isVehicleDetected: boolean;
  readonly isImageClear: boolean;
  readonly photoQualityScore: number; // 1 to 10
  readonly rejectionReason?: 
    | 'TOO_DARK'
    | 'TOO_BLURRY'
    | 'NOT_A_VEHICLE'
    | 'TOO_CLOSE_NO_SURFACE_VISIBLE';
  readonly retakeGuidance?: string; // e.g. "Step back 3 feet to show full side door"
}
```

### Layer 4: Retake Guidance Sheet
If Gemini flags the image with `photoQualityScore < 5` or `isImageClear: false`:
* The app presents a clear, friendly retake sheet displaying the specific tip suggested by the AI:
  > 💡 *"We couldn't clearly analyze your paint because of low light. Turn on your flashlight or move closer to a lamp, then try again."*

### Layer 5: Fallback Manual Quick Selector (Failsafe)
If 2 consecutive scans fail due to unfixable dark lighting:
* Instead of blocking the user, the app seamlessly falls back to an **Assisted 3-Question Selector**:
  1. *What is the primary condition?* `[ Dust & Dirt | Heavy Mud | Swirls & Scratches | Brake Dust ]`
  2. *Vehicle Type?* `[ Sedan | SUV | Truck / Van ]`
* Provides immediate package recommendations without getting stuck on AI scanning errors.
