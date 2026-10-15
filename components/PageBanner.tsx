import PageHero from '@/components/PageHero'

export default function PageBanner({
  eyebrow,
  title,
  description,
  breadcrumb,
}: {
  eyebrow: string
  title: string
  description: string
  breadcrumb: string
}) {
  return (
    <PageHero
      eyebrow={eyebrow}
      title={title}
      description={description}
      breadcrumb={breadcrumb}
      backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80"
    />
  )
}
