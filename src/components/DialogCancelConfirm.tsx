import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from "@/components/ui/dialog";
// import { Field, FieldGroup } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

export interface DialogCancelConfirmProps {
  title: string;
  message: string;
  open: boolean;
  onClose: (confirmed?: boolean) => void;
}

export default function DialogCancelConfirm(props: DialogCancelConfirmProps) {
  const { onClose, open, title, message } = props;

  const handleClose = () => {
    onClose();
  };

  const cancel = () => {
    onClose(false);
  };

  const confirm = () => {
    onClose(true);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      {/* <form> */}
      {/* <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            <p>{message}</p>
          </DialogDescription>
        </DialogHeader>
        {/* <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </Field>
            <Field>
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </Field>
          </FieldGroup> */}
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" onClick={() => cancel()}>
              Cancel
            </Button>
          </DialogClose>
          {/* <Button type="submit">Save</Button> */}
          <Button type="button" variant="destructive" onClick={() => confirm()}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
      {/* </form> */}
    </Dialog>
  );
}
