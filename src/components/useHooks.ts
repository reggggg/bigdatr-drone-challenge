import toast from "react-hot-toast";
import { Billboard, GetBillboardResponse, InstructDroneResponse } from "./helpers";

export default function useHooks() {

  async function instructDrone(instructions: string): Promise<Pick<InstructDroneResponse, "instructions" | "billboards"> | null> {
    try {
      const cleanedInstructions = instructions.trim().toLowerCase();
      const response = await fetch(`http://localhost:4001/instruct-drone?instructions=${cleanedInstructions}`)
      const result = await response.json() as InstructDroneResponse;

      console.log('instruct drone:', result);
      if (result.success === false) {
        throw new Error(result.message);
      }

      if (result.billboards.length === 0) {
        throw new Error('You forgot to capture (x)')
      }

      const billboards: Billboard[] = result.billboards;
      
      const capturedBillboards = await Promise.all(billboards.map((billboard) => getBillboard(billboard.id)));

      const validCapturedBillboards = capturedBillboards.filter(
        (billboard): billboard is Billboard => billboard !== null
      );

      return {
        instructions: result.instructions,
        billboards: validCapturedBillboards
      };
    } catch (err: unknown) {
      if (err instanceof Error) toast.error(err.message); 
      else toast.error('An unknown error occurred');
      return null;
    }

    async function getBillboard(billboardId: string): Promise<Billboard | null> {
      try {
        const response = await fetch(`http://localhost:4001/get-billboard?id=${billboardId}`)
        const result = await response.json() as GetBillboardResponse;
        
        if (result.success === false) {
          throw new Error('Billboard retrieval failed')
        }

        return result.billboard
      } catch (err: unknown) {
        if (err instanceof Error) toast.error(err.message); 
        else toast.error('An unknown error occurred');
        return null;
      }
    }
  
  }

  return {
    instructDrone
  }
}