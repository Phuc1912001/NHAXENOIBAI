import { useState, useEffect } from "react";
import { FormInstance } from "antd";

type FormValues = Record<string, any>;

export const useUnsavedChanges = (form: FormInstance, visible: boolean) => {
  const [initialValues, setInitialValues] = useState<FormValues>({});
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (visible) {
      const values = form.getFieldsValue();
      setInitialValues(values);
    }
  }, [visible, form]);

  const handleFormChange = () => {
    const currentValues = form.getFieldsValue();
    const dirty = Object.keys(currentValues).some(
      (key) => currentValues[key] !== initialValues[key]
    );
    setIsDirty(dirty);
  };

  return { isDirty, handleFormChange, setIsDirty };
};
