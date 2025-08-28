export async function getWorkflowById(id: number) {
    try {
      const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
      const response = await fetch(`${BASE_URL}/api/WorkflowDefinitions/GetWorkflowDefinitionsAndStepById/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        
        },
      });
  
      if (!response.ok) {
        throw new Error(`خطا در دریافت اطلاعات: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
      console.error('خطا در دریافت Workflow:', error.message);
      throw error;
    }
  }
}