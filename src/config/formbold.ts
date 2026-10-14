/**
 * FormBold Integration Configuration & Submission Handler
 * FormBold Documentation: https://formbold.com
 *
 * To connect your FormBold form:
 * 1. Create a form at https://formbold.com
 * 2. Copy your Form ID (e.g. "obv12" or your unique form ID from the FormBold dashboard URL https://formbold.com/s/YOUR_FORM_ID)
 * 3. Set VITE_FORMBOLD_FORM_ID in your environment, or replace DEFAULT_FORMBOLD_FORM_ID below.
 */

export const DEFAULT_FORMBOLD_FORM_ID = '9BbgD';

export const getFormBoldEndpoint = (customFormId?: string): string => {
  const formId =
    (customFormId && customFormId.trim() && customFormId !== 'your_form_id' ? customFormId.trim() : null) ||
    (import.meta.env.VITE_FORMBOLD_FORM_ID && import.meta.env.VITE_FORMBOLD_FORM_ID !== 'your_form_id'
      ? import.meta.env.VITE_FORMBOLD_FORM_ID
      : null) ||
    (typeof window !== 'undefined' &&
    localStorage.getItem('amman_formbold_form_id') &&
    localStorage.getItem('amman_formbold_form_id') !== 'your_form_id'
      ? localStorage.getItem('amman_formbold_form_id')
      : null) ||
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
