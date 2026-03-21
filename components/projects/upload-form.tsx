'use client';

import { useState, useCallback, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TechStackInput } from './tech-stack-input';
import { ProjectPreviewCard } from './project-preview-card';
import { uploadProject } from '@/lib/projects';
import { Loader2, Upload, X, Check, Github } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ProjectFormData } from '@/types/projects';

const projectSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(2000, 'Description must be less than 2000 characters'),
  github_url: z
    .string()
    .url('Invalid URL')
    .refine((url) => !url || url.includes('github.com'), {
      message: 'Must be a valid GitHub URL',
    })
    .or(z.literal(''))
    .optional(),
  screenshot_url: z.string().optional(),
  tech_stack: z
    .array(z.string())
    .min(1, 'Select at least one technology')
    .max(10, 'Maximum 10 technologies allowed'),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

interface UploadFormProps {
  userId: string;
}

export function UploadForm({ userId }: UploadFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string>('');
  const [uploadError, setUploadError] = useState<string>('');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      description: '',
      github_url: '',
      tech_stack: [],
    },
  });

  // Watch form values for preview
  const formValues = watch();

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setUploadError('');

    if (!file) return;

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size must be less than 5MB');
      return;
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setUploadError('Please upload a JPG, PNG, WebP, or GIF image');
      return;
    }

    setScreenshotFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setScreenshotPreview(reader.result as string);
      setValue('screenshot_url', reader.result as string);
    };
    reader.readAsDataURL(file);
  }, [setValue]);

  const handleRemoveScreenshot = useCallback(() => {
    setScreenshotFile(null);
    setScreenshotPreview('');
    setValue('screenshot_url', '');
  }, [setValue]);

  const onSubmit = async (data: ProjectFormValues) => {
    setUploadError('');

    startTransition(async () => {
      try {
        const formData = {
          title: data.title,
          description: data.description,
          github_url: data.github_url || null,
          screenshot_url: screenshotPreview || null,
          tech_stack: data.tech_stack,
        };

        const result = await uploadProject(userId, formData);

        if (result.success) {
          router.push('/projects');
          router.refresh();
        } else {
          setUploadError(result.error || 'Failed to upload project');
        }
      } catch (error) {
        setUploadError('An unexpected error occurred');
      }
    });
  };

  const onCancel = () => {
    router.back();
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Form */}
      <div className="space-y-6">
        <div className="glass-card rounded-xl p-6 space-y-6">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground mb-1">
              Upload Your Project
            </h2>
            <p className="text-sm text-muted-foreground">
              Share your creation with the ClawAcademy community
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-foreground">
                Project Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                placeholder="My Awesome Project"
                {...register('title')}
                className={cn(
                  'bg-card/50 border-border/50',
                  errors.title && 'border-destructive/50'
                )}
                disabled={isPending}
              />
              {errors.title && (
                <p className="text-xs text-destructive">{errors.title.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-foreground">
                Description <span className="text-destructive">*</span>
              </Label>
              <textarea
                id="description"
                placeholder="Describe your project, what it does, and how you built it..."
                rows={4}
                {...register('description')}
                className={cn(
                  'flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-card/50 border-border/50 resize-none',
                  errors.description && 'border-destructive/50'
                )}
                disabled={isPending}
              />
              <div className="flex justify-between">
                {errors.description ? (
                  <p className="text-xs text-destructive">{errors.description.message}</p>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    {formValues.description?.length || 0} / 2000
                  </p>
                )}
              </div>
            </div>

            {/* GitHub URL */}
            <div className="space-y-2">
              <Label htmlFor="github_url" className="text-foreground flex items-center gap-2">
                <Github className="h-4 w-4" />
                GitHub Repository URL
              </Label>
              <Input
                id="github_url"
                type="url"
                placeholder="https://github.com/username/repo"
                {...register('github_url')}
                className={cn(
                  'bg-card/50 border-border/50',
                  errors.github_url && 'border-destructive/50'
                )}
                disabled={isPending}
              />
              {errors.github_url && (
                <p className="text-xs text-destructive">{errors.github_url.message}</p>
              )}
            </div>

            {/* Screenshot Upload */}
            <div className="space-y-2">
              <Label htmlFor="screenshot" className="text-foreground">
                Screenshot <span className="text-muted-foreground">(optional)</span>
              </Label>
              <div className="relative">
                <Input
                  id="screenshot"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={isPending}
                />
                {!screenshotPreview ? (
                  <label
                    htmlFor="screenshot"
                    className={cn(
                      'flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-card/30 hover:bg-card/50 transition-colors',
                      isPending && 'opacity-50 cursor-not-allowed'
                    )}
                  >
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload screenshot
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG, WebP, GIF up to 5MB
                    </p>
                  </label>
                ) : (
                  <div className="relative group">
                    <img
                      src={screenshotPreview}
                      alt="Screenshot preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveScreenshot}
                      disabled={isPending}
                      className="absolute top-2 right-2 p-1 bg-destructive/90 text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
              {uploadError && (
                <p className="text-xs text-destructive">{uploadError}</p>
              )}
            </div>

            {/* Tech Stack */}
            <div className="space-y-2">
              <Label className="text-foreground">
                Technologies Used <span className="text-destructive">*</span>
              </Label>
              <TechStackInput
                value={formValues.tech_stack || []}
                onChange={(tags) => setValue('tech_stack', tags)}
                placeholder="Type to search technologies..."
                maxTags={10}
              />
              {errors.tech_stack && (
                <p className="text-xs text-destructive">{errors.tech_stack.message}</p>
              )}
            </div>

            {/* Error Message */}
            {uploadError && !errors.title && !errors.description && !errors.github_url && !errors.tech_stack && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/50">
                <p className="text-sm text-destructive">{uploadError}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isPending}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="flex-1 cyber-button bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Upload Project
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Preview */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-display font-bold text-foreground">
            Live Preview
          </h3>
          <span className="text-xs text-muted-foreground px-2 py-1 rounded bg-card/50 border border-border/50">
            Your project will appear like this
          </span>
        </div>
        <ProjectPreviewCard
          data={{
            ...formValues,
            screenshot_file: screenshotFile,
          }}
        />
      </div>
    </div>
  );
}
