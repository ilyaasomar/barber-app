import { Dialog, DialogContent } from "@/components/ui/dialog";
interface DialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
}
const DialogModal = ({ isOpen, setIsOpen, children }: DialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <div className="no-scrollbar -mx-4 max-h-[80vh] overflow-y-auto px-4">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogModal;
