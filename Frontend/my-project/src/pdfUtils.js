import jsPDF from 'jspdf'

export function generatePDF(form, result, provider) {
  try {
    // Create a professional PDF with better structure and clean text
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' })
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const margin = 40
    const maxWidth = pageWidth - margin * 2
    const centerX = pageWidth / 2

    let y = margin

    // Add header with logo and clinic info
    pdf.setFillColor(47, 54, 95) // Dark blue background like the logo
    pdf.rect(0, 0, pageWidth, 80, 'F')
    
    // Add logo text and clinic name with proper spacing
    pdf.setTextColor(255, 255, 255) // White text
    pdf.setFontSize(18)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Global Child Wellness Centre', centerX, 30, { align: 'center' })
    
    pdf.setFontSize(16)
    pdf.setFont('helvetica', 'bold')
    pdf.text('AUTISM ASSESSMENT REPORT', centerX, 50, { align: 'center' })
    
    // Add date in header
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    pdf.text('Date: ' + new Date().toLocaleDateString('en-GB'), pageWidth - margin, 25, { align: 'right' })

    y = 100 // Start content after header with proper gap
    pdf.setTextColor(0, 0, 0) // Black text for content

    // Patient Information Section
    pdf.setFillColor(245, 245, 245) // Light gray background
    pdf.rect(margin, y - 8, maxWidth, 25, 'F')
    
    pdf.setFontSize(16)
    pdf.setFont('helvetica', 'bold')
    pdf.text('PATIENT INFORMATION', margin + 10, y + 8)
    y += 35

    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'normal')
    
    // Create two columns for patient info
    const leftColumn = margin + 15
    const rightColumn = centerX + 15
    
    pdf.text('Name: ' + (form.name || 'N/A'), leftColumn, y)
    pdf.text('Age: ' + (form.age || 'N/A') + ' years', rightColumn, y)
    y += 20
    
    if (form.parentName) {
      pdf.text('Parent/Guardian: ' + form.parentName, leftColumn, y)
    }
    if (form.phoneNumber) {
      pdf.text('Contact: ' + form.phoneNumber, rightColumn, y)
    }
    y += 20
    
    pdf.text('Provider: ' + (provider || 'AI Assessment'), leftColumn, y)
    y += 20
    
    // Add emotion detection summary if available
    if (form.detectedEmotions) {
      const topEmotion = Object.entries(form.detectedEmotions)
        .sort((a, b) => b[1] - a[1])[0]
      
      if (topEmotion) {
        const emotionText = `${topEmotion[0]} (${Math.round(topEmotion[1] * 100)}%)`
        pdf.setFont('helvetica', 'bold')
        pdf.text('Detected Emotion: ', leftColumn, y)
        pdf.setFont('helvetica', 'normal')
        pdf.text(emotionText, rightColumn, y)
        y += 20
      }
    }
    
    y += 10

    // Assessment Responses Section
    pdf.setFillColor(240, 248, 255) // Light blue background
    pdf.rect(margin, y - 8, maxWidth, 25, 'F')
    
    pdf.setFontSize(16)
    pdf.setFont('helvetica', 'bold')
    pdf.text('ASSESSMENT RESPONSES', margin + 10, y + 8)
    y += 35

    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'normal')

    const assessmentData = [
      { label: 'Eye Contact:', value: form.eyeContact || 'N/A' },
      { label: 'Speech Level:', value: form.speechLevel || 'N/A' },
      { label: 'Social Response:', value: form.socialResponse || 'N/A' },
      { label: 'Sensory Reactions:', value: form.sensoryReactions || 'N/A' }
    ]

    for (const item of assessmentData) {
      pdf.setFont('helvetica', 'bold')
      pdf.text('• ' + item.label, leftColumn, y)
      pdf.setFont('helvetica', 'normal')
      
      const responseText = pdf.splitTextToSize(item.value, maxWidth - 140)
      pdf.text(responseText, leftColumn + 120, y)
      y += 20
    }

    y += 15

    // Analysis Results Section (if available)
    if (result) {
      pdf.setFillColor(255, 250, 240) // Light orange background
      pdf.rect(margin, y - 8, maxWidth, 25, 'F')
      
      pdf.setFontSize(16)
      pdf.setFont('helvetica', 'bold')
      pdf.text('AI ANALYSIS RESULTS', margin + 10, y + 8)
      y += 35

      // Focus Areas
      if (result.focusAreas && result.focusAreas.length) {
        pdf.setFontSize(14)
        pdf.setFont('helvetica', 'bold')
        pdf.text('Focus Areas:', leftColumn, y)
        y += 20
        
        pdf.setFontSize(11)
        pdf.setFont('helvetica', 'normal')
        
        // Show focus areas in a single line if possible
        const focusAreasText = result.focusAreas.map((area, i) => (i + 1) + '. ' + area).join(', ')
        const focusLines = pdf.splitTextToSize(focusAreasText, maxWidth - 30)
        pdf.text(focusLines, leftColumn + 15, y)
        y += focusLines.length * 15 + 15
      }

      // Therapy Goals
      if (result.therapyGoals && result.therapyGoals.length) {
        pdf.setFontSize(14)
        pdf.setFont('helvetica', 'bold')
        pdf.text('Therapy Goals:', leftColumn, y)
        y += 20
        
        pdf.setFontSize(11)
        pdf.setFont('helvetica', 'normal')
        
        for (let i = 0; i < Math.min(result.therapyGoals.length, 3); i++) {
          const goalText = pdf.splitTextToSize('Goal ' + (i + 1) + ': ' + result.therapyGoals[i].text, maxWidth - 30)
          pdf.text(goalText, leftColumn + 15, y)
          y += goalText.length * 15 + 8
        }
        y += 15
      }

      // Recommended Activities
      if (result.activities && result.activities.length) {
        pdf.setFontSize(14)
        pdf.setFont('helvetica', 'bold')
        pdf.text('Recommended Activities:', leftColumn, y)
        y += 20
        
        pdf.setFontSize(11)
        pdf.setFont('helvetica', 'normal')
        
        // Show only first 2 activities to save space
        for (let i = 0; i < Math.min(result.activities.length, 2); i++) {
          pdf.setFont('helvetica', 'bold')
          const activityTitle = pdf.splitTextToSize((i + 1) + '. ' + result.activities[i].text, maxWidth - 30)
          pdf.text(activityTitle, leftColumn + 15, y)
          pdf.setFont('helvetica', 'normal')
          y += activityTitle.length * 15 + 5
          
          // Show steps with proper indentation
          if (result.activities[i].steps && result.activities[i].steps.length) {
            for (let j = 0; j < Math.min(result.activities[i].steps.length, 3); j++) {
              const stepText = pdf.splitTextToSize('   • ' + result.activities[i].steps[j], maxWidth - 60)
              pdf.text(stepText, leftColumn + 25, y)
              y += stepText.length * 12 + 4
            }
          }
          y += 8
        }
        
        // Add note if more activities exist
        if (result.activities.length > 2) {
          pdf.setFontSize(10)
          pdf.text('+ ' + (result.activities.length - 2) + ' more activities available in detailed report', leftColumn + 15, y)
          y += 15
        }
      }
    }

    // Professional Footer with proper left-right split
    pdf.setFillColor(47, 54, 95) // Dark blue background
    pdf.rect(0, pageHeight - 70, pageWidth, 70, 'F')
    
    pdf.setFontSize(11)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(255, 255, 255) // White text
    
    // Left side - Contact Information
    pdf.text('Opening Hours: Mon - Sat (10.00AM-06.00PM)', margin + 15, pageHeight - 50)
    pdf.text('Address: 127 I-BLOCK, SARABHA NAGAR', margin + 15, pageHeight - 35)
    pdf.text('Phone: +919501032237, +917696730604', margin + 15, pageHeight - 20)
    
    // Right side - Website only
    pdf.text('Website: https://globalchildwellness.com/', pageWidth - margin - 15, pageHeight - 35, { align: 'right' })

    // Save with clean filename
    const safeName = (form.name || 'Patient').toString().replace(/[^a-z0-9_-]/gi, '_')
    const timestamp = new Date().toISOString().slice(0, 10)
    pdf.save('Autism_Assessment_' + safeName + '_' + timestamp + '.pdf')
    
  } catch (err) {
    console.error(err)
    alert('Failed to generate PDF: ' + (err.message || err))
  }
}