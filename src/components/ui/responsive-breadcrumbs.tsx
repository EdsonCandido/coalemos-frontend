"use client"

import React, { memo } from "react"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"

interface BreadcrumbsProps {
  breadcrumbs: { path: string; label: string }[]
}

const ResponsiveBreadcrumbs = ({ breadcrumbs }: BreadcrumbsProps) =>  {
  if (!breadcrumbs || breadcrumbs.length === 0) return null

  const lastIndex = breadcrumbs.length - 1

  // No mobile, mostramos apenas o último ou penúltimo nível
  const mobileBreadcrumbs =
    breadcrumbs.length > 2
      ? [
          { path: breadcrumbs[0].path, label: "..." },
          breadcrumbs[lastIndex - 1],
          breadcrumbs[lastIndex],
        ]
      : breadcrumbs

  return (
    <Breadcrumb className="w-full overflow-hidden">
      <BreadcrumbList className="flex items-center gap-1">
        {breadcrumbs.map((item, index) => {
          const isLast = index === lastIndex
          return (
            <React.Fragment key={item.path}>
              <BreadcrumbItem className="hidden md:block min-w-0">
                {isLast ? (
                  <BreadcrumbPage className="truncate">{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={item.path} className="truncate">
                    {item.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {/* Separador só para desktop */}
              {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
            </React.Fragment>
          )
        })}

        {/* Mobile version */}
        {mobileBreadcrumbs.map((item, index) => {
          const isLast = index === mobileBreadcrumbs.length - 1
          return (
            <React.Fragment key={item.path}>
              <BreadcrumbItem className="md:hidden min-w-0">
                {isLast ? (
                  <BreadcrumbPage className="truncate">{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={item.path} className="truncate">
                    {item.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator className="md:hidden" />}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default memo(ResponsiveBreadcrumbs)