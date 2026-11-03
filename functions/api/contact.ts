import { handleContactRequest, type ContactEnvironment } from '../../src/lib/contact-handler.ts';

type PagesFunctionContext = {
  request: Request;
  env: ContactEnvironment;
};

export function onRequestPost(context: PagesFunctionContext) {
  return handleContactRequest(context.request, context.env);
}
