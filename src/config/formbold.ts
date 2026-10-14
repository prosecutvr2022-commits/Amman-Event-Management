/**
 * FormBold Integration Configuration & Submission Handler
 * FormBold Documentation: https://formbold.com
 *
 * To connect your FormBold form:
 * 1. Create a form at https://formbold.com
 * 2. Copy your Form ID (e.g. "obv12" or your unique form ID from the FormBold dashboard URL https://formbold.com/s/YOUR_FORM_ID)
 * 3. Set VITE_FORMBOLD_FORM_ID in your environment, or replace DEFAULT_FORMBOLD_FORM_ID below.
 */

export const DEFAULT_FORMBOLD_FORM_ID = 'your_form_id';

export const getFormBoldEndpoint = (customFormId?: string): string => {
  const formId =
    customFormId ||
    import.meta.env.VITE_FORMBOLD_FORM_ID ||
    (typeof window !== 'undefined' ? localStorage.getItem('amman_formbold_form_id') : null) ||
    DEFAULT_FORMBOLD_FORM_ID;

  return `https://formbold.com/s/${formId}`;
};

export interface FormBoldSubmissionResult {
  success: boolean;
  message?: string;
  isMockDemo?: boolean;
}

/**
 * Submit form payload to FormBold serverless endpoint
 */
export async function submitToFormBold(
  payload: Record<string, any>,
  customFormId?: string
): Promise<FormBoldSubmissionResult> {
  const endpoint = getFormBoldEndpoint(customFormId);

  // If using placeholder ID, simulate success or allow local testing
  if (endpoint.endsWith('/your_form_id')) {
    console.info(
      'FormBold Info: Using placeholder Form ID. To receive submissions in your email, set your FormBold Form ID in src/config/formbold.ts or VITE_FORMBOLD_FORM_ID.'
    );
    // Add artificial delay for realistic UX
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      success: true,
      message: 'Enquiry received. To receive emails directly, configure your FormBold Form ID.',
      isMockDemo: true,
    };
  }

  try {
    const formData = new FormData();
    for (const [key, value] of Object.entries(payload)) {
      if (Array.isArray(value)) {
        formData.append(key, value.join(', '));
      } else if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    });

    if (response.ok) {
      return { success: true };
    }

    const errorData = await response.json().catch(() => null);
    const errorMessage = errorData?.message || `Submission returned status ${response.status}`;
    console.warn('FormBold error response:', errorMessage);

    return {
      success: false,
      message: errorMessage,
    };
  } catch (error: any) {
    console.error('FormBold submission network error:', error);
    return {
      success: false,
      message: error?.message || 'Network error while contacting FormBold server',
    };
  }
}
