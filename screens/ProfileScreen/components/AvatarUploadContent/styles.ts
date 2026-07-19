export const avatarUploadStyles = {
  container: 'px-5 pt-2 pb-8 bg-notch',
  title: 'text-slate-900 font-heading-bold mb-4 text-center',
  actions: 'flex-row gap-3 mt-4',
  cancelButton: 'flex-1 py-3.5 rounded-2xl items-center bg-white border border-slate-200',
  cancelLabel: 'text-slate-600 font-body-semibold',
  saveLabel: 'text-white font-body-semibold',
  saveButton: (isUploading: boolean) =>
    `flex-1 py-3.5 rounded-2xl items-center bg-primary-600 ${isUploading ? 'opacity-55' : ''}`,
};
