# Psych Eval PWA

A secure, offline-compatible Progressive Web Application (PWA) providing a suite of standard psychiatric rating scales for clinicians and self-assessment.

**Live Demo:** [Click Here](https://abinanthan.github.io/psych-eval/) *(Replace with your actual URL after deployment)*

## 🧠 Supported Scales

This application implements 17 standard psychiatric assessment tools:

### Self-Report
*   **PHQ-9**: Patient Health Questionnaire (Depression)
*   **GAD-7**: Generalized Anxiety Disorder Scale
*   **DASS-21**: Depression, Anxiety, and Stress Scale
*   **AUDIT**: Alcohol Use Disorders Identification Test
*   **DAST-10**: Drug Abuse Screening Test
*   **CAGE**: Substance Abuse Screening
*   **ASRS-v1.1**: Adult ADHD Self-Report Scale
*   **CUDIT-R**: Cannabis Use Disorder Identification Test
*   **SDS**: Severity of Dependence Scale

### Clinician-Administered
*   **HAM-D (Hamilton Depression)**: 17-item depression severity rating.
*   **HAM-A (Hamilton Anxiety)**: 14-item anxiety severity rating.
*   **Y-BOCS**: Yale-Brown Obsessive Compulsive Scale.
*   **MMSE**: Mini-Mental State Examination (Cognitive).
*   **COWS**: Clinical Opiate Withdrawal Scale.
*   **CIWA-Ar**: Clinical Institute Withdrawal Assessment for Alcohol.
*   **Fagerstrom**: Test for Nicotine Dependence.

## ✨ Features

*   **100% Client-Side**: No data is sent to any server. All scoring happens instantly in your browser.
*   **Privacy Focused**: No cookies, no tracking, no database.
*   **PWA Ready**: Installable on Android, iOS, and Desktop. Works offline.
*   **Responsive Design**: Premium glassmorphism UI optimized for mobile and tablet.
*   **Search & Filter**: Quickly find scales by category (Depression, Anxiety, Substance, etc.) or name.

## 🚀 Deployment

### GitHub Pages (Automated)

This project is configured for automatic deployment via GitHub Actions.

1.  Push this repository to GitHub.
2.  Go to **Settings > Pages**.
3.  Under **Build and deployment**, select **Source** as **GitHub Actions**.
4.  The action will run automatically on push to `main` and deploy your app.

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## ⚠️ Disclaimer

This application is for educational and clinical tracking purposes only. It does not provide medical diagnosis. Results should be interpreted by a qualified healthcare professional.
