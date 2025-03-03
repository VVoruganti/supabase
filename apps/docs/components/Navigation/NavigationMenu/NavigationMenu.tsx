import { useRouter } from 'next/router'
import { memo, useEffect } from 'react'
import { menuState } from '~/hooks/useMenuState'
import NavigationMenuGuideList from './NavigationMenuGuideList'
import NavigationMenuRefList from './NavigationMenuRefList'
// @ts-expect-error
import spec_js_v2 from '~/../../spec/supabase_js_v2.yml' assert { type: 'yml' }
// @ts-expect-error
import spec_js_v1 from '~/../../spec/supabase_js_v1.yml' assert { type: 'yml' }
// @ts-expect-error
import spec_dart_v1 from '~/../../spec/supabase_dart_v1.yml' assert { type: 'yml' }
// @ts-expect-error
import spec_dart_v0 from '~/../../spec/supabase_dart_v0.yml' assert { type: 'yml' }
// import { gen_v3 } from '~/lib/refGenerator/helpers'
import apiCommonSections from '~/../../spec/common-api-sections.json'
import cliCommonSections from '~/../../spec/common-cli-sections.json'
import libCommonSections from '~/../../spec/common-client-libs-sections.json'
import authServerCommonSections from '~/../../spec/common-self-hosting-auth-sections.json'
import realtimeServerCommonSections from '~/../../spec/common-self-hosting-realtime-sections.json'
import storageServerCommonSections from '~/../../spec/common-self-hosting-storage-sections.json'
import { flattenSections } from '~/lib/helpers'
import NavigationMenuHome from './HomeMenu'

// Filter libCommonSections for just the relevant sections in the current library
function generateAllowedClientLibKeys(sections, spec) {
  // Filter parent sections first

  const specIds = spec.functions.map((func) => {
    return func.id
  })

  const newShape = flattenSections(sections).filter((section) => {
    if (specIds.includes(section.id)) {
      return section
    }
  })

  const final = newShape.map((func) => {
    return func.id
  })

  return final
}

export type RefIdOptions =
  | 'reference_javascript_v1'
  | 'reference_javascript_v2'
  | 'reference_dart_v0'
  | 'reference_dart_v1'
  | 'reference_cli'
  | 'reference_api'
  | 'reference_self_hosting_auth'
  | 'reference_self_hosting_storage'
  | 'reference_self_hosting_realtime'

export type RefKeyOptions =
  | 'javascript'
  | 'dart'
  | 'cli'
  | 'api'
  | 'self-hosting-auth'
  | 'self-hosting-storage'
  | 'self-hosting-realtime'

const SideNav = () => {
  const router = useRouter()

  let version = ''

  if (router.asPath.includes('v1')) {
    version = '_v1'
  }

  if (router.asPath.includes('v0')) {
    version = '_v0'
  }

  function handleRouteChange(url: string) {
    switch (url) {
      case `/docs`:
        menuState.setMenuLevelId('home')
        break
      case url.includes(`/docs/guides/getting-started`) && url:
        menuState.setMenuLevelId('gettingstarted')
        break
      case url.includes(`/docs/guides/database`) && url:
        menuState.setMenuLevelId('database')
        break
      case url.includes(`/docs/guides/auth`) && url:
        menuState.setMenuLevelId('auth')
        break
      case url.includes(`/docs/guides/functions`) && url:
        menuState.setMenuLevelId('functions')
        break
      case url.includes(`/docs/guides/realtime`) && url:
        menuState.setMenuLevelId('realtime')
        break
      case url.includes(`/docs/guides/storage`) && url:
        menuState.setMenuLevelId('storage')
        break
      case url.includes(`/docs/guides/platform`) && url:
        menuState.setMenuLevelId('platform')
        break
      case url.includes(`/docs/guides/resources`) && url:
        menuState.setMenuLevelId('resources')
        break
      case url.includes(`/docs/guides/self-hosting`) && url:
        menuState.setMenuLevelId('self_hosting')
        break
      case url.includes(`/docs/guides/integrations`) && url:
        menuState.setMenuLevelId('integrations')
        break
      // JS v1
      case url.includes(`/docs/reference/javascript/v1`) && url:
        menuState.setMenuLevelId('reference_javascript_v1')
        break
      // JS v2 (latest)
      case url.includes(`/docs/reference/javascript`) && url:
        menuState.setMenuLevelId('reference_javascript_v2')
        break
      // dart v0
      case url.includes(`/docs/reference/dart/v0`) && url:
        menuState.setMenuLevelId('reference_dart_v0')
        break
      // dart v1 (latest)
      case url.includes(`/docs/reference/dart`) && url:
        menuState.setMenuLevelId('reference_dart_v1')
        break
      case url.includes(`/docs/reference/cli`) && url:
        menuState.setMenuLevelId('reference_cli')
        break
      case url.includes(`/docs/reference/api`) && url:
        menuState.setMenuLevelId('reference_api')
        break
      case url.includes(`/docs/reference/self-hosting-auth`) && url:
        menuState.setMenuLevelId('reference_self_hosting_auth')
        break
      case url.includes(`/docs/reference/self-hosting-storage`) && url:
        menuState.setMenuLevelId('reference_self_hosting_storage')
        break
      case url.includes(`/docs/reference/self-hosting-realtime`) && url:
        menuState.setMenuLevelId('reference_self_hosting_realtime')
        break

      default:
        break
    }
  }

  useEffect(() => {
    handleRouteChange(router.basePath + router.asPath)
    // Listen for page changes after a navigation or when the query changes
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <div className="flex relative">
      {/* // main menu */}
      <NavigationMenuHome />
      <NavigationMenuGuideList id={'gettingstarted'} />
      <NavigationMenuGuideList id={'database'} />
      <NavigationMenuGuideList id={'auth'} />
      <NavigationMenuGuideList id={'functions'} />
      <NavigationMenuGuideList id={'realtime'} />
      <NavigationMenuGuideList id={'storage'} />
      <NavigationMenuGuideList id={'platform'} />
      <NavigationMenuGuideList id={'resources'} />
      <NavigationMenuGuideList id={'integrations'} />
      <NavigationMenuGuideList id={'self_hosting'} />
      <NavigationMenuGuideList id={'reference'} />
      {/* // Client Libs */}
      <NavigationMenuRefList
        key={'reference-js-menu-v1'}
        id={'reference_javascript_v1'}
        commonSections={libCommonSections}
        lib="javascript"
        allowedClientKeys={generateAllowedClientLibKeys(libCommonSections, spec_js_v1)}
      />
      <NavigationMenuRefList
        key={'reference-js-menu'}
        id={'reference_javascript_v2'}
        commonSections={libCommonSections}
        lib="javascript"
        allowedClientKeys={generateAllowedClientLibKeys(libCommonSections, spec_js_v2)}
      />
      <NavigationMenuRefList
        key={'reference-dart-menu'}
        id={'reference_dart_v0'}
        commonSections={libCommonSections}
        lib="dart"
        allowedClientKeys={generateAllowedClientLibKeys(libCommonSections, spec_dart_v0)}
      />
      <NavigationMenuRefList
        key={'reference-dart-menu-v1'}
        id={'reference_dart_v1'}
        commonSections={libCommonSections}
        lib="dart"
        allowedClientKeys={generateAllowedClientLibKeys(libCommonSections, spec_dart_v1)}
      />
      {/* // Tools */}
      <NavigationMenuRefList
        key={'reference-cli-menu'}
        id={'reference_cli'}
        commonSections={cliCommonSections}
        lib="cli"
      />
      <NavigationMenuRefList
        key={'reference-api-menu'}
        id={'reference_api'}
        commonSections={apiCommonSections}
        lib="api"
      />
      {/* // Self Hosting Server */}
      <NavigationMenuRefList
        key={'reference-self-hosting-auth-menu'}
        id={'reference_self_hosting_auth'}
        commonSections={authServerCommonSections}
        lib="self-hosting-auth"
      />
      <NavigationMenuRefList
        key={'reference-self-hosting-storage-menu'}
        id={'reference_self_hosting_storage'}
        commonSections={storageServerCommonSections}
        lib="self-hosting-storage"
      />
      <NavigationMenuRefList
        key={'reference-self-hosting-realtime-menu'}
        id={'reference_self_hosting_realtime'}
        commonSections={realtimeServerCommonSections}
        lib="self-hosting-auth"
      />
    </div>
  )
}

export default memo(SideNav)
